'use client';

import { getWebPushPublicKey, registerPushSubscription } from '@/actions/push';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useState, useTransition } from 'react';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from(Array.from(rawData, (char) => char.charCodeAt(0)));
}

export function EnableBrowserPushButton() {
  const [isPending, startTransition] = useTransition();
  const [enabled, setEnabled] = useState(false);

  const onEnable = () => {
    startTransition(async () => {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        toast({ title: 'This browser does not support push notifications.', variant: 'destructive' });
        return;
      }

      const keyResult = await getWebPushPublicKey();
      if (!keyResult.configured || !('publicKey' in keyResult)) {
        toast({
          title: 'Browser push is not configured yet.',
          description: 'Ask an admin to set WEB_PUSH_PUBLIC_KEY / WEB_PUSH_PRIVATE_KEY.',
          variant: 'destructive',
        });
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        toast({ title: 'Notification permission denied.', variant: 'destructive' });
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(keyResult.publicKey),
      });

      const json = subscription.toJSON();
      const result = await registerPushSubscription({
        endpoint: json.endpoint,
        keys: json.keys,
      });

      if ('error' in result && result.error) {
        toast({ title: result.error, variant: 'destructive' });
        return;
      }

      setEnabled(true);
      toast({ title: 'success' in result ? result.success : 'Browser notifications enabled.' });
    });
  };

  return (
    <Button
      type='button'
      variant='outline'
      className='rounded-full mt-4'
      disabled={isPending || enabled}
      onClick={onEnable}
    >
      {enabled ? 'Browser push enabled' : isPending ? 'Enabling…' : 'Enable browser push on this device'}
    </Button>
  );
}
