const dashboards: dashboardDto[] = [];

// import user ,


const getDashboards = async (req: Request, res: Response) => {
    res.send(dashboards);
};
  
const getDashboard = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    for (let i = 0; i < .length; i++) {
      if (id == users[i].userId) {
        res.send(users[i].);
        return;
      }
    }
}

const updateDashboard = async (req: Request, res: Response) =>{
    
}

const dashboardController = {
    getDashboards,
    getDashboard,
    updateDashboard
  };

export default dashboardController;



