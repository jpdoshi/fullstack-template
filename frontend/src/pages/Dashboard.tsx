const Dashboard = () => {
  return (
    <>
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="text-indigo-600 mt-0.5 font-medium">
        Welcome, Today is {new Date().toDateString()}
      </p>
    </>
  );
};

export default Dashboard;
