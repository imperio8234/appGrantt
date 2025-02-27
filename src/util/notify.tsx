import { message } from 'antd';

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const notify = (content: string, status: NoticeType) => {
    messageApi.open({
      type: status,
      content,
    });
  };

  return { notify, contextHolder };
};

export default useNotification;
