const CompanyCard = ({ companyName, jobCount, onClick }) => (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            <span className="text-lg font-bold text-custom-blue">
              {companyName[0]?.toUpperCase() || "N"}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{companyName}</h3>
            <p className="text-sm text-gray-500">{jobCount} Job Profiles</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );

  export default CompanyCard;