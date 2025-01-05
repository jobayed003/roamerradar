import { redirect } from 'next/navigation';

const MessagePage = ({ params }: { params: { userId: string } }) => {
  redirect('/');
  // return null;
};

export default MessagePage;
