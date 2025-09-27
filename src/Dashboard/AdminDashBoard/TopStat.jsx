
const TopStat = ({icon1:Icon1,icon2:Icon2,title,value,growth}) => {
    return (
       
            <div className="card  bg-base-100 card-sm shadow-sm">
            <div className="card-body">
                <div className="flex justify-between">
                    <div>
                        <Icon1 className="w-6 h-6 text-primary"/>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <Icon2 className="w-6 h-6 text-orange-700"/>
                        </div>
                        <div className="text-orange-700">+{growth}%</div>
                    </div>
                </div>
               
                 <div className="mt-8">
                    <h1 className="text-2xl font-bold">{value}</h1>
                    <p className="text-sm text-gray-400">{title}</p>
                </div>
            </div>
            </div>
      
       
    );
};

export default TopStat;