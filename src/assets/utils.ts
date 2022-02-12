export const isViewable = (pageRole: userRole, userRole: userRole): boolean => (
  pageRole === 'viewer'
    || userRole === 'admin'
    || pageRole === userRole);

export const isEditable = (): boolean => {
  const role = localStorage.getItem('role');
  return role === 'admin' || role === 'editor';
};
