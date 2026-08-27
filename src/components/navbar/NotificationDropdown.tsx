'use client';

import {
  fetchNotifications,
  markAllAsRead,
  markNotificationAsRead,
} from '@/actions/notifications';
import Dropdown from '@/components/ui/dropdown';
import useIsMounted from '@/hooks/useIsMounted';
import { cn, getFirstLetters } from '@/lib/utils';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Ref, useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useOnClickOutside } from 'usehooks-ts';

type ClientNotification = {
  id: string;
  type: 'MESSAGE' | 'BOOKING';
  title: string;
  body: string;
  href: string | null;
  image: string | null;
  readAt: string | null;
  createdAt: string;
  actor: {
    id: string;
    displayName: string | null;
    name: string | null;
    realName: string | null;
    image: string | null;
  } | null;
};

function actorLabel(notification: ClientNotification) {
  if (!notification.actor) return notification.title;
  return (
    notification.actor.displayName ||
    notification.actor.realName ||
    notification.actor.name ||
    notification.title
  );
}

const NotificationDropdown = () => {
  const { isClicked, onClose, onOpen, onOutsideClick } = useNotificationStore();
  const ref = useRef(null);
  const { isMounted } = useIsMounted();
  const [notifications, setNotifications] = useState<ClientNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const loadNotifications = useCallback(() => {
    startTransition(async () => {
      const result = await fetchNotifications();
      if ('error' in result) return;
      setNotifications(result.notifications);
      setUnreadCount(result.unreadCount);
    });
  }, []);

  useEffect(() => {
    loadNotifications();
    const interval = window.setInterval(loadNotifications, 30_000);
    return () => window.clearInterval(interval);
  }, [loadNotifications]);

  useEffect(() => {
    if (isClicked) {
      loadNotifications();
    }
  }, [isClicked, loadNotifications]);

  useOnClickOutside(ref, onOutsideClick);

  if (!isMounted) return null;

  const handleOpen = () => {
    onOpen();
  };

  return (
    <Dropdown isClicked={isClicked} onOutsideClick={onOutsideClick} onClose={onClose} onOpen={handleOpen}>
      <div className='relative p-2 hover:text-black dark:hover:text-white '>
        <IoNotificationsOutline className='h-6 w-6 text-gray_text hover:text-black dark:hover:text-white' />
        {unreadCount > 0 ? (
          <span className='absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-blue text-[10px] font-bold text-white flex items-center justify-center'>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        ) : null}
      </div>

      <AnimatePresence>
        {isClicked && (
          <NotificationsPanel
            ref={ref}
            notifications={notifications}
            isPending={isPending}
            unreadCount={unreadCount}
            onClose={onClose}
            onMarkedRead={(id) => {
              setNotifications((current) =>
                current.map((item) =>
                  item.id === id ? { ...item, readAt: item.readAt ?? new Date().toISOString() } : item
                )
              );
              setUnreadCount((count) => Math.max(0, count - 1));
            }}
            onMarkedAllRead={() => {
              setNotifications((current) =>
                current.map((item) => ({ ...item, readAt: item.readAt ?? new Date().toISOString() }))
              );
              setUnreadCount(0);
            }}
          />
        )}
      </AnimatePresence>
    </Dropdown>
  );
};

type NotificationsPanelProps = {
  ref: Ref<HTMLDivElement> | undefined;
  notifications: ClientNotification[];
  isPending: boolean;
  unreadCount: number;
  onClose: () => void;
  onMarkedRead: (id: string) => void;
  onMarkedAllRead: () => void;
};

const NotificationsPanel = ({
  ref,
  notifications,
  isPending,
  unreadCount,
  onClose,
  onMarkedRead,
  onMarkedAllRead,
}: NotificationsPanelProps) => {
  const router = useRouter();
  const [isUpdating, startTransition] = useTransition();

  const openNotification = (notification: ClientNotification) => {
    startTransition(async () => {
      if (!notification.readAt) {
        await markNotificationAsRead(notification.id);
        onMarkedRead(notification.id);
      }
      onClose();
      if (notification.href) {
        router.push(notification.href);
        router.refresh();
      }
    });
  };

  const handleMarkAll = () => {
    startTransition(async () => {
      await markAllAsRead();
      onMarkedAllRead();
    });
  };

  return (
    <motion.div
      className={
        'text-black w-[350px] max-h-[420px] overflow-y-auto p-6 absolute top-[4rem] -left-[12.2rem] items-start justify-start gap-y-4 rounded-3xl dark:text-white dark:hover:text-white shadow-lg dark:bg-gradient bg-background z-[100000]'
      }
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      ref={ref}
      onClick={(event) => event.stopPropagation()}
    >
      <div className='flex items-center justify-between gap-3 pt-2'>
        <h1 className='text-2xl font-medium font-poppins'>Notifications</h1>
        {unreadCount > 0 ? (
          <button
            type='button'
            className='text-xs font-semibold text-blue hover:underline disabled:opacity-50'
            disabled={isUpdating}
            onClick={handleMarkAll}
          >
            Mark all read
          </button>
        ) : null}
      </div>

      {isPending && notifications.length === 0 ? (
        <p className='text-sm text-gray_text py-8'>Loading notifications…</p>
      ) : null}

      {!isPending && notifications.length === 0 ? (
        <div className='py-8 space-y-2'>
          <p className='text-sm text-gray_text'>No notifications yet.</p>
          <Link href='/messages' className='text-sm font-semibold text-blue hover:underline' onClick={onClose}>
            Open messages
          </Link>
        </div>
      ) : null}

      <div className='divide-y divide-gray_border/40'>
        {notifications.map((notification) => {
          const image = notification.image || notification.actor?.image;
          const label = actorLabel(notification);

          return (
            <button
              key={notification.id}
              type='button'
              className='flex w-full gap-3 items-start py-4 text-left hover:opacity-90 transition'
              onClick={() => openNotification(notification)}
              disabled={isUpdating}
            >
              <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-dark_russian'>
                {image ? (
                  <Image
                    src={image}
                    alt={label}
                    fill
                    className='object-cover'
                    unoptimized={image.startsWith('data:')}
                  />
                ) : (
                  <div className='h-full w-full flex items-center justify-center text-xs font-bold'>
                    {getFirstLetters(label)}
                  </div>
                )}
              </div>

              <div className='font-poppins min-w-0 flex-1'>
                <h2 className='font-medium truncate'>{label}</h2>
                <p className='text-sm text-gray_text line-clamp-2'>{notification.body}</p>
                <p className='text-xs text-muted-foreground mt-1'>
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>

              <div
                className={cn(
                  'w-2.5 h-2.5 rounded-full mt-2 shrink-0',
                  notification.readAt ? 'bg-transparent' : 'bg-blue'
                )}
              />
            </button>
          );
        })}
      </div>

      <div className='pt-2'>
        <Link
          href='/messages'
          className='text-sm font-semibold text-blue hover:underline'
          onClick={onClose}
        >
          View all messages
        </Link>
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;
