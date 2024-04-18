import { db } from "@/lib/firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export type UserState = {
  currentUser: object | null;
  isLoading: boolean;
};

export type UserActions = {
  fetchCurrentUser: (uid: string) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  currentUser: null,
  isLoading: false,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        fetchCurrentUser: async (uid: string) => {
          try {
            set({ currentUser: null, isLoading: true });
            const userDocRef = doc(db, "users", uid);
            const user = (await getDoc(userDocRef)).data();
            if (user) {
              set({ currentUser: { ...user, uid: uid }, isLoading: false });
            }
          } catch (err) {
            console.log(err);
            set({ currentUser: null, isLoading: false });
          } finally {
            set((state) => ({
              currentUser: state.currentUser,
              isLoading: false,
            }));
          }
        },
      }),
      {
        name: "userStore",
      }
    )
  );
};
