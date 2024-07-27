import { defineStore } from 'pinia';

export const useGroupsStore = defineStore('groups', {
  state: () => ({
    groupCurrentId: useCookie('groupCurrentId').value,
  }),
  actions: {
    setGroups(id: string | null) {
      this.setGroupsCookie(id);
    },
    setGroupsCookie(id: string | null) {
      const groupCurrentId = useCookie('groupCurrentId');
      groupCurrentId.value = id;
      this.groupCurrentId = id;
    },
  },
});
