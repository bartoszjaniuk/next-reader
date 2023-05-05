export type UserFromSession = {
    user: {
      token: string;
      id: string;
      email: string;
      avatarUrl: string;
    }
  };