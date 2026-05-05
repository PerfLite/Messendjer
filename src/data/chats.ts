export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  attachments?: { type: 'image' | 'file'; name: string; url?: string }[];
  reactions?: { emoji: string; count: number }[];
  isVoice?: boolean;
  voiceDuration?: string;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group' | 'channel';
  participants: User[];
  name?: string;
  avatar?: string;
  messages: Message[];
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
}

export const currentUser: User = {
  id: 'me',
  name: 'Алексей Козлов',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  status: 'online',
};

const users: User[] = [
  {
    id: 'u1',
    name: 'Мария Петрова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    status: 'online',
  },
  {
    id: 'u2',
    name: 'Дмитрий Волков',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    status: 'away',
    lastSeen: '15 мин назад',
  },
  {
    id: 'u3',
    name: 'Анна Соколова',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'offline',
    lastSeen: '2 ч назад',
  },
  {
    id: 'u4',
    name: 'Сергей Морозов',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'online',
  },
  {
    id: 'u5',
    name: 'Елена Кузнецова',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    status: 'offline',
    lastSeen: 'вчера',
  },
  {
    id: 'u6',
    name: 'Александр Новиков',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    status: 'away',
    lastSeen: '30 мин назад',
  },
  {
    id: 'u7',
    name: 'Ольга Попова',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    status: 'online',
  },
  {
    id: 'u8',
    name: 'Иван Лебедев',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
    status: 'offline',
    lastSeen: '5 ч назад',
  },
];

export const chats: Chat[] = [
  {
    id: 'c1',
    type: 'direct',
    participants: [users[0]],
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Привет! Как дела с проектом?', timestamp: '2025-05-05T09:30:00', isRead: true },
      { id: 'm2', senderId: 'me', text: 'Привет, Мария! Всё идёт по плану, завтра сдам отчёт.', timestamp: '2025-05-05T09:32:00', isRead: true },
      { id: 'm3', senderId: 'u1', text: 'Отлично! Я уже начала подготовку к презентации.', timestamp: '2025-05-05T09:35:00', isRead: true },
      { id: 'm4', senderId: 'u1', text: 'Думаю, нам стоит обсудить детали дизайна?', timestamp: '2025-05-05T10:15:00', isRead: true },
      { id: 'm5', senderId: 'me', text: 'Согласен. Давай встретимся после обеда?', timestamp: '2025-05-05T10:20:00', isRead: true },
      { id: 'm6', senderId: 'u1', text: 'Договорились! В 14:00 в переговорной?', timestamp: '2025-05-05T10:22:00', isRead: false },
    ],
    unreadCount: 1,
    isPinned: true,
    isMuted: false,
  },
  {
    id: 'c2',
    type: 'direct',
    participants: [users[1]],
    messages: [
      { id: 'm7', senderId: 'u2', text: 'Бро, ты видел новый релиз React?', timestamp: '2025-05-05T08:00:00', isRead: true },
      { id: 'm8', senderId: 'me', text: 'Ещё нет! Что там интересного?', timestamp: '2025-05-05T08:05:00', isRead: true },
      { id: 'm9', senderId: 'u2', text: 'Серверные компоненты стали ещё быстрее. Разница ощутима.', timestamp: '2025-05-05T08:10:00', isRead: true },
      { id: 'm10', senderId: 'u2', text: 'И ещё новый хук use — очень удобный для подвязки промисов.', timestamp: '2025-05-05T08:12:00', isRead: true },
      { id: 'm11', senderId: 'me', text: 'Круто! Надо будет обновить наш проект.', timestamp: '2025-05-05T08:30:00', isRead: true },
      { id: 'm12', senderId: 'u2', text: 'Давай вечером созвонимся, покажу на примерах.', timestamp: '2025-05-05T11:00:00', isRead: false },
    ],
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
  },
  {
    id: 'c3',
    type: 'group',
    name: 'Команда разработки',
    participants: [users[1], users[2], users[3]],
    messages: [
      { id: 'm13', senderId: 'u3', text: 'Ребята, деплой на прод прошёл успешно!', timestamp: '2025-05-05T07:00:00', isRead: true },
      { id: 'm14', senderId: 'u2', text: 'Ура! Отличная работа, Анна.', timestamp: '2025-05-05T07:05:00', isRead: true },
      { id: 'm15', senderId: 'u4', text: 'Мониторинг показывает стабильные метрики. Нагрузка держится хорошо.', timestamp: '2025-05-05T07:15:00', isRead: true },
      { id: 'm16', senderId: 'me', text: 'Молодцы все! Отдыхаем сегодня? 😄', timestamp: '2025-05-05T07:20:00', isRead: true },
      { id: 'm17', senderId: 'u3', text: 'Конечно! Пицца за счёт компании в 18:00.', timestamp: '2025-05-05T07:25:00', isRead: true, reactions: [{ emoji: '🎉', count: 4 }] },
      { id: 'm18', senderId: 'u4', text: 'Буду там! Спасибо.', timestamp: '2025-05-05T07:30:00', isRead: true },
      { id: 'm19', senderId: 'u2', text: 'Я тоже приду. Кто-нибудь смотрел логи за последний час?', timestamp: '2025-05-05T12:00:00', isRead: false },
    ],
    unreadCount: 1,
    isPinned: true,
    isMuted: false,
  },
  {
    id: 'c4',
    type: 'direct',
    participants: [users[2]],
    messages: [
      { id: 'm20', senderId: 'u3', text: 'Спасибо за помощь с документацией!', timestamp: '2025-05-04T16:00:00', isRead: true },
      { id: 'm21', senderId: 'me', text: 'Всегда пожалуйста, Анна. Если что — обращайся.', timestamp: '2025-05-04T16:30:00', isRead: true },
      { id: 'm22', senderId: 'u3', text: 'Отправила тебе файлы на проверку.', timestamp: '2025-05-04T17:00:00', isRead: true, attachments: [{ type: 'file', name: 'API_Docs_v2.pdf' }] },
      { id: 'm23', senderId: 'me', text: 'Посмотрю вечером и отпишусь.', timestamp: '2025-05-04T17:15:00', isRead: true },
      { id: 'm24', senderId: 'u3', text: 'Договорились. Хорошего вечера!', timestamp: '2025-05-04T17:20:00', isRead: true },
    ],
    unreadCount: 0,
    isPinned: false,
    isMuted: true,
  },
  {
    id: 'c5',
    type: 'channel',
    name: 'Design Daily',
    participants: [users[3], users[4]],
    messages: [
      { id: 'm25', senderId: 'u4', text: 'Сегодняшняя подборка вдохновения по UI:', timestamp: '2025-05-05T06:00:00', isRead: true },
      { id: 'm26', senderId: 'u4', text: 'Glassmorphism сделал камбэк в 2025. Красивые примеры из Dribbble.', timestamp: '2025-05-05T06:05:00', isRead: true, attachments: [{ type: 'image', name: 'glass_examples.png', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop' }] },
      { id: 'm27', senderId: 'u5', text: 'Очень красиво! Особенно с фиолетовыми градиентами.', timestamp: '2025-05-05T06:30:00', isRead: true },
      { id: 'm28', senderId: 'u4', text: 'Да, согласен. Ещё заметил тренд на микро-анимации при наведении.', timestamp: '2025-05-05T07:00:00', isRead: true },
      { id: 'm29', senderId: 'me', text: 'Отличная подборка, Сергей!', timestamp: '2025-05-05T08:00:00', isRead: true },
    ],
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  {
    id: 'c6',
    type: 'direct',
    participants: [users[4]],
    messages: [
      { id: 'm30', senderId: 'u5', text: 'Привет, Алексей! Ты не мог бы помочь с презентацией для клиента?', timestamp: '2025-05-03T14:00:00', isRead: true },
      { id: 'm31', senderId: 'me', text: 'Привет, Елена! Да, конечно. Когда дедлайн?', timestamp: '2025-05-03T14:15:00', isRead: true },
      { id: 'm32', senderId: 'u5', text: 'В пятницу к 16:00. Уже готова структура, нужна помощь с визуалом.', timestamp: '2025-05-03T14:20:00', isRead: true },
      { id: 'm33', senderId: 'me', text: 'Без проблем. Пришли материалы, посмотрю сегодня вечером.', timestamp: '2025-05-03T14:30:00', isRead: true },
      { id: 'm34', senderId: 'u5', text: 'Спасибо огромное! Ты спасаешь ситуацию.', timestamp: '2025-05-03T14:35:00', isRead: true, reactions: [{ emoji: '❤️', count: 1 }] },
    ],
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  {
    id: 'c7',
    type: 'group',
    name: 'Семейный чат',
    participants: [users[5], users[6]],
    messages: [
      { id: 'm35', senderId: 'u6', text: 'Мам, пап, как ваши дела?', timestamp: '2025-05-05T10:00:00', isRead: true },
      { id: 'm36', senderId: 'u7', text: 'Всё хорошо, сынок! Мы сегодня в парке гуляли.', timestamp: '2025-05-05T10:05:00', isRead: true, attachments: [{ type: 'image', name: 'park.jpg', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' }] },
      { id: 'm37', senderId: 'u6', text: 'Как красиво! Жаль, что я не смог приехать.', timestamp: '2025-05-05T10:10:00', isRead: true },
      { id: 'm38', senderId: 'me', text: 'Привет всем! Классные фото!', timestamp: '2025-05-05T10:30:00', isRead: true },
      { id: 'm39', senderId: 'u7', text: 'Алексей, ты когда в гости приедешь?', timestamp: '2025-05-05T10:35:00', isRead: true },
      { id: 'm40', senderId: 'me', text: 'На выходных постараюсь заехать!', timestamp: '2025-05-05T10:40:00', isRead: true },
    ],
    unreadCount: 0,
    isPinned: false,
    isMuted: true,
  },
  {
    id: 'c8',
    type: 'direct',
    participants: [users[7]],
    messages: [
      { id: 'm41', senderId: 'u8', text: 'Бро, ты ещё не спишь?', timestamp: '2025-05-04T23:00:00', isRead: true },
      { id: 'm42', senderId: 'me', text: 'Нет, что случилось?', timestamp: '2025-05-04T23:05:00', isRead: true },
      { id: 'm43', senderId: 'u8', text: 'Хочу показать тебе новый трек. Зацени!', timestamp: '2025-05-04T23:10:00', isRead: true, isVoice: true, voiceDuration: '0:42' },
      { id: 'm44', senderId: 'me', text: 'Круто звучит! Ты сам написал?', timestamp: '2025-05-04T23:30:00', isRead: true },
      { id: 'm45', senderId: 'u8', text: 'Да, вчера всю ночь сидел в Ableton.', timestamp: '2025-05-04T23:35:00', isRead: true },
      { id: 'm46', senderId: 'me', text: 'Огонь! Давай вместе что-нибудь замутим.', timestamp: '2025-05-04T23:40:00', isRead: true },
    ],
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
];
