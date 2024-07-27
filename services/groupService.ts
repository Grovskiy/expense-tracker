import { useGroupsStore } from '~/store/groups';

export function groupService() {
  const { setGroups } = useGroupsStore();

  async function getGroup() {

    await request('/api/Groups', {
      method: 'get',
    }).then(res => {
      const response = res as { id: string }[];
      const id = response[0].id;
      setGroups(id);
    });
  }

  return {
    getGroup,
  };
}
