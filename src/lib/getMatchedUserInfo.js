const getMatchedUserInfo = (users, loggedInUser) => {
  const newUsers = { ...users };
  delete newUsers[loggedInUser];

  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
};
export default getMatchedUserInfo;
