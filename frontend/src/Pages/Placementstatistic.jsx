import React, { useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Placementstatistics = () => {
  const [selectedBatch, setSelectedBatch] = useState('2025');
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const batches = ['2025','2024', '2023', '2022', '2021'];

  // Data for all years (same as before)
  const yearlyData = {
    '2025': {
      ugPlacement: [
        { department: 'CSE', percentage: 94.48 },
        { department: 'ECE', percentage: 100.00 },
        { department: 'EE', percentage: 90.91 },
        { department: 'IT', percentage: 81.37 },
        { department: 'CHE', percentage: 100.00 },
        { department: 'ICE', percentage: 100.00 },
        { department: 'CE', percentage: 57.75 },
        { department: 'IPE', percentage: 100.00 },
        { department: 'ME', percentage: 100.00 },
        { department: 'BT', percentage: 72.73 },
        { department: 'TT', percentage: 96.36 }
      ],
      ctcData: [
        { branch: 'CSE', ctc: 15.83 },
      { branch: 'ECE', ctc: 13.20 },
  { branch: 'EE', ctc: 10.51 },
  { branch: 'IT', ctc: 15.07 },
  { branch: 'CHE', ctc: 8.26 },
  { branch: 'ICE', ctc: 10.67 },
  { branch: 'CE', ctc: 6.75 },
  { branch: 'IPE', ctc: 7.54 },
  { branch: 'ME', ctc: 7.54 },
  { branch: 'BT', ctc: 6.80 },
  { branch: 'TT', ctc: 5.46 }
      ],
      ctcDistribution: [
        { name: 'Less than 5 LPA', value: 13.03, color: '#0369A0' },
        { name: '5+ LPA - 10 LPA', value: 54.72, color: '#FF8C42' },
        { name: '10+ LPA - 15 LPA', value: 12.63, color: '#008080' },
        { name: 'More than 15 LPA', value: 19.06, color: '#FFD700' }
      ],
      summaryStats: {
        percentagePlacement: '91.88 %',
        totalOffers: '1005',
        maxCTC: '52 LPA',
        avgCTC: '9.78 LPA'
      },
      companies: ["ACME Generics", "AMD", "Aakash Institute", "Aarti Industries Ltd.", "Accenture", "Accolite", "Acedemor", "Aditya Birla", "Afcons", "Air Liquide", "Algoquant", "Alphonso", "Amantya Tech", "Amazon", "Anatech consulting", "Arvind Pvt Ltd", "Asahi India Glass Ltd.", "Ashriwad Pipes", "Astrotalk", "Atlas Consolidated", "BEL", "BNP Paribas", "Barco Electronics", "Bharat Electronics Ltd.", "Bharat Petroleum Corporation Ltd", "Bit to Byte robotics", "Blackrock", "Blinkt", "Block Next Labs", "Blog Vault", "Bluno Technologies", "Bosch Global Software", "Browserstack", "Bullseyes", "CDac Mohali", "Cabalt Breakout Platforms Inc", "Cabra Bags", "Cadence", "Centrient Pharaceuticals India Pvt. Ltd.", "Chainscore Finance Pvt. Ltd.", "Chambal Fertilizers", "Cimpress", "Cisco", "Citi Bank", "Clear", "Clearwater", "Cloudprism Solution Pvt. ltd.", "Cloudwick", "Codebugged Ai", "CoinSwitch", "Comile IT as a Credential Platform", "Concast", "Coperion", "Cred", "Crompton", "Cure.fit", "Cvent", "Dayanand Sagar University", "Dealermatrix", "Delhivery", "Delihivery", "Dell Technologies", "E2open", "ENTNT", "EY Global", "Engineer India Limited", "Engineers India Ltd.", "Enoylity", "Ensuredit Technologies", "Equilibrium Solutions", "Fastenal", "Fidelity International", "Fiducia Accounting Services", "Flipkart", "FnZ", "Fratelli Singh Pvt. ltd.", "FurtureFirst", "G.S.International", "Globallogic", "Goldman Sachs", "Google", "HCL Tech", "HP Inc", "HPCL", "Hero Edu", "Himatsinka", "Honda Cars India Ltd", "Honeywell", "Hoping Minds", "Hummingbird Web Solution", "Hyundai", "ICICI Bank", "IEC Electric Power Ltd.", "IOLCP", "Increff", "India Glycols Ltd.", "IndiaMart", "Infineon", "Infinity Learn", "Infoedge", "Infosys", "Insurance Dekho", "Intel", "Intellipaat", "Ivypods Pvt. Ltd.", "JK Cement", "Jayaswal Neco Industries Ltd.", "Jubilant Food Works", "Jungle works", "Juspay", "KBR", "KISCO India Pvt. Ltd.", "KMBD Architects", "Kashmiri Lal Tarun Khanna Pvt. ltd.", "Kfintech", "Khosla Profil Pvt. Ltd.", "Khushal Rubber Industires", "Kirloskar Ferrous", "Kisanwala Technology Pvt. ltd.", "Kuantum Paper", "L&T Ltd", "Lifelong online", "LikeMinds Or CollabMates Pvt. Ltd.", "Listenlights Pvt. Ltd.", "M/s Mahavir Ugyog", "MAQ Software", "MKU", "Mahalaxmi Malt Productions Pvt. Ltd", "Manohar Filaments Pvt. ltd.", "Maruti Suzuki", "Media Tek", "Medtronic", "Microsoft", "Midas IT Solutions Pvt. Ltd.", "Mondelez", "Movidu Technology", "Mphasis", "Mu Sigma", "NAB Technology", "NBC Bearing", "NFT Biennial", "NSTextile", "NVIDIA", "NXP", "Namekart", "Nayara Energy Limited", "NetQull Technologies", "Neutrawell Healthcare Pvt. Ltd.", "Nitin Enterprises", "Nmtronic", "Nvida", "Nxfin Technologies Pvt. ltd.", "Nykaa", "OGGANS", "Odoo India", "Omneky", "Optum", "Oracle", "Orbit It Solution", "PI Industries", "Pantair", "Paytm", "Philips", "Physics Wallah", "Pipeshub Tech Pvt. Ltd.", "Pocket FM", "Powerplay", "Pradan", "Premier tissues India Ltd.", "Primotech", "Proxima Steel Forge Pvt. Ltd", "Quicksell & Doubletick", "RHI Magnesita India Ltd.", "RPSG(CPDL)NPCI", "RSR International", "RSWM Ltd", "Ralson Tyers", "Rapidfort", "Raptorx. Ai", "Reliance", "Ricela", "Royal -X Cycle Industires", "SLB-Pvt", "SRF Limited", "SSWL", "Salesforce", "Samsung E&A", "Samsung R&D", "Samsung SRI", "Samsung Semicoductor India", "Sanathan Polycot", "Sangam India Limited", "School Hack", "School Hack FZLLC", "Servicenow", "Servon Solution LLP", "Shorthill", "Siemens", "Sigmoid Analyst", "Signify", "Silicon Labs", "Spectramedix", "Sri Chaitanya", "Subros Limited", "Summit Technology Group", "Sunpharma", "Swiggy India", "Synopsys", "T&D Electronics Systems", "TAPI Technologies", "TATA 1MG Healthcare Solution", "Tagmango", "Tata Consulting Engineers", "Tata Hitachi", "Tata Motors", "Tata Power", "Tech Exponent System", "TechnipEnergies", "Tex Links", "Texfasteners", "Thrillophilla", "Toyoink India", "Tredance", "Trianz Digital", "Trident India", "Turing", "Tynor", "UKG", "Unthinkable", "Vardhman Taxtiles Ltd", "Varroc Engineering Limited", "Vivo Mobiles", "Voltas", "Warner Bros", "Wipro", "Woven and Knit", "Writesonic", "ZS Associates", "Zomato", "Zscaler"]
    },
    '2024': {
      ugPlacement:[
        { department: 'CSE', percentage: 94.03 },
  { department: 'ECE', percentage: 80.68 },
  { department: 'EE', percentage: 93.88 },
  { department: 'IT', percentage: 90.83 },
  { department: 'CHE', percentage: 98.11 },
  { department: 'ICE', percentage: 94.05 },
  { department: 'CE', percentage: 80.33 },
  { department: 'IPE', percentage: 94.03 },
  { department: 'ME', percentage: 100.00 },
  { department: 'BT', percentage: 50.00 },
  { department: 'TT', percentage: 64.00 }
],
      ctcData: [
        { branch: 'CSE', ctc: 14.61 },
      { branch: 'ECE', ctc: 10.45 },
  { branch: 'EE', ctc: 11.87 },
  { branch: 'IT', ctc: 13.29 },
  { branch: 'CHE', ctc: 7.45 },
  { branch: 'ICE', ctc: 10.24 },
  { branch: 'CE', ctc: 7.37 },
  { branch: 'IPE', ctc: 8.40 },
  { branch: 'ME', ctc: 7.91 },
  { branch: 'BT', ctc: 7.37 },
  { branch: 'TT', ctc: 8.59 }
      ],
      ctcDistribution: [
        { name: 'Less than 5 LPA', value: 3.55, color: '#0369A0' },
        { name: '5+ LPA - 10 LPA', value: 65.06, color: '#FF8C42' },
        { name: '10+ LPA - 15 LPA', value: 15.46, color: '#008080' },
        { name: 'More than 15 LPA', value: 15.92, color: '#FFD700' }
      ],
      summaryStats: {
        percentagePlacement: '88.78%',
        totalOffers: '880',
        maxCTC: '52 LPA',
        avgCTC: '9.78 LPA'
      },
      companies: ["ACME Group", "Aakash Educational Services Ltd.", "Aakash Institute", "Aarti Industries Limited", "Accenture", "Accolite India", "Adani Group", "Adobe", "AdvaRisk", "Afcons Infrastructure Ltd.", "Affordable Organic Store", "Airtel Bharti", "Allen Education", "Allen Overseas", "Allenoverseas", "Amantya Technology", "Amazon", "Arvind Limited", "Asahi India Glass Ltd.", "Ashirvad by Aliaxis", "Ashok Leyland", "Atlassian", "Avalara India", "Axis Bank", "Axtria", "BGPPL (Bilt)", "Bajaj Finance Limited", "Bajaj Finserv", "Bakliwal Tutorials Pvt. Ltd.", "Berger Paints India Ltd.", "Betalectic", "Bharat Petroleum Corporation Limited", "Blackrock", "Blinkit", "Brance", "C-DAC", "CDot", "CLOUDSUFI India Pvt. Ltd.", "Cairn Oil India Pvt.Ltd.", "Capgemini Solutions", "CareInsurance India Pvt. Ltd.", "Cisco Systems (India) Private Limited", "Citi Bank", "Colgate", "Copperpod IP", "Crescendo Group", "Cubastion Consulting", "Cubik", "Cvent India", "Daimler Truck Innovation Center India", "Dealermatix", "Decathlon", "Delhivery Limited", "DirectionEducare", "EIL (Engineering India Limited)", "ENTNT", "EXL Services", "EY GDS", "Ensuredit", "Everenviro", "Fastenal India", "FebHotels", "Fiserv", "Flipkart India", "Future First", "GE Meridium Services and Labs Pvt. Ltd.", "Gainers India", "Genpact NextGen", "GoDigit", "Goldman Sachs", "Google India", "Grazitti", "HCL Tech", "HLS Asisa", "HPCL", "HPCL, Mittal Energy Limited", "HPCL, Rajasthan", "Havells", "Hero Motto Corp.", "Hexaware Technologies", "Hike Education", "Himatsingka", "Hyundai Motors", "IBM India", "IDS Infotech Ltd.", "IOL chemicals and Pharmaceuticals Ltd.", "Incedo", "Increff", "Incture", "Indus Valley Partners (IVP)", "Infineon Technology", "Infoedge (I) Pvt Ltd.", "Infosys", "Inox Air Products India", "Insurance Dekho India Pvt. Ltd.", "Intel", "JK Cement", "Johnson controls india", "Jubilantfood works", "Jungleworks", "KEC International Ltd", "L&T Limited", "Legrand", "MAQ Software", "Mahindra & Mahindra", "Maruti Suzuki India", "Maxop Engineering India Pvt. Ltd.", "Mecon", "Media Tek Noida", "Microsoft", "Minimalist", "Mitsogo", "Moody's", "Mphasis", "NBC Bearings", "Nayara Energy Limited", "Neenopal", "Nokia", "Nuvoco Vistas", "Nvidia", "O9 Solutions", "Oceaneering", "Octro (SGM Software Private Limited)", "Om Careers", "Online247", "Online24x7", "Optum", "Optum India", "Oracle India", "Oriental Carbon & Chemicals Limited", "P I Industries Limited", "PayPal University Team", "Polycabs", "ProcDNA's", "Qbit Labs Pvt. Ltd.", "Quantiphi", "Quark Software", "RAIK Solutions", "Ralson (India) Limited", "Rapidfort Inc.", "Reliance Industries Limited", "Sagacious Research", "Samsung Engineering", "Samsung Research Noida", "Sanmarg Projects Pvt Ltd", "Schlumberger(SLB)", "Scryanalytics", "Servicenow India", "Shorthills", "Skylark Drones", "Sonalika", "Spyne ai", "Subros Limited", "Sukhjit Corn Products", "Suraasa", "Suzuki Motores", "TA Digital", "TATA Consulting Engineers Limited", "Tata Consultancy Services", "Teachnook", "Tech Mahindra", "Technip Energy", "Terobots Enterprises Pvt. Ltd.", "Tesco", "Tescra", "Tex Fasteners", "Tredence", "Trianz", "Trident Group", "Trutzschler", "UIX Labs", "UKG", "Unacademy", "Unicommerce ESolutions Pvt. Ltd.", "Urban Company", "Vardhman Textile Limited", "Vedanta Group", "Veritas Technologies LLC", "Water Technologies & Solutions", "Wiingy", "Xeno", "XenonStack", "Zomato", "Zscaler"]
    },
    '2023': {
     ugPlacement: [
       { department: 'CSE', percentage: 94.17 },
       { department: 'ECE', percentage: 85.19 },
  { department: 'EE', percentage: 68.33 },
  { department: 'IT', percentage: 91.53 },
  { department: 'CHE', percentage: 90.32 },
  { department: 'ICE', percentage: 84.68 },
  { department: 'CE', percentage: 75.61 },
  { department: 'IPE', percentage: 80.65 },
  { department: 'ME', percentage: 95.00 },
  { department: 'BT', percentage: 32.43 },
  { department: 'TT', percentage: 50.57 }
      ],
      ctcData: [
        { branch: 'CSE', ctc: 16.74 },
   { branch: 'ECE', ctc: 16.67 },
  { branch: 'EE', ctc: 10.83 },
  { branch: 'IT', ctc: 12.95 },
  { branch: 'CHE', ctc: 7.45 },
  { branch: 'ICE', ctc: 9.94 },
  { branch: 'CE', ctc: 7.28 },
  { branch: 'IPE', ctc: 8.29 },
  { branch: 'ME', ctc: 8.43 },
  { branch: 'BT', ctc: 8.18 },
  { branch: 'TT', ctc: 7.70 }
      ],
      ctcDistribution: [
        { name: 'Less than 5 LPA', value: 5.23, color: '#0369A0' },
        { name: '5+ LPA - 10 LPA', value: 68.45, color: '#FF8C42' },
        { name: '10+ LPA - 15 LPA', value: 15.67, color: '#008080' },
        { name: 'More than 15 LPA', value: 10.65, color: '#FFD700' }
      ],
      summaryStats: {
        percentagePlacement: '80.63%',
        totalOffers: '904',
        maxCTC: '51 LPA',
        avgCTC: '10.41 LPA'
      },
      companies: ["42Gears Mobility Systems Pvt. Ltd.", "AAIS Global LLC", "Aakash Educational Services Limited", "Aarti Industries Limited", "Accenture", "Accolite Digital", "Adani Group", "Advantage Club", "Afcons Infrastructure Ltd.", "Air India Limited", "Allen Career Institute Pvt. Ltd.", "Allen Overseas", "Amantya Technologies", "Amazon", "American Express", "Aniter Solutions", "Arcesium", "Ashok Leyland", "Aspect Ratio", "Axis Bank", "BPCL", "Bajaj Auto Limited", "Bharat Electronics Limited", "Bhaskram Group", "Brane", "Brigosha Technologies Pvt. Ltd.", "Bugsmirror Research Pvt. Ltd.", "Byju's (Think & Learn Pvt. ltd.)", "C-DAC", "C-Dot", "Cadence", "Cairn Oil & Gas", "Caparo", "Carin Oil & Gas", "Comviva", "Cvent India Pvt. Ltd.", "Daimler Truck Innovation Center India", "Deepak Fertilizers and Petrochemical", "Delhivery Limited", "Dell Technologies", "Deloitte", "EXL Services", "EY Global Delivery Servics", "Edgeverve Systems", "Edgistify", "Enerzinx India Pvt. ltd.", "Engineers India Limited", "Ensuredit", "FIITJEE Limited", "Factspan", "Fiat India Automobiles Pvt. Ltd.", "Flipkart", "Futures First", "GoldmanSachs", "Google India Pvt. Ltd.", "HCL Technology", "HMEL", "Havells", "Hexaware Technologies", "Hindustan Petroleum Corporation Limited", "Honda Card India Limited", "Honda R & D", "IOLCP", "IVP", "Incedo Inc", "Increff (Nextscm Solutions Pvt. Ltd.)", "Incture Technologies Pvt. Ltd.", "Indiamart Intermesh Ltd.", "Infineon Technologies India Pvt. Ltd.", "Infoedge", "Insurance Dekho", "Intel Technology India Pvt. Ltd.", "Interra Systems India Pvt. Ltd.", "Intuit Product Development Pvt Ltd", "JK Cement", "JSW", "Jarvis Technology", "Jio Platforms Limited", "Josh Technology", "Jubilant Generics Limited", "Jubilant Pharmova Limited", "JungleWorks", "KEC International", "Kapsons Industries Pvt. Ltd.", "L&T Limited", "Luminous", "Mahindra & Mahindra", "ManjushreeIndia", "Maruti Suzuki India Pvt. Ltd.", "Marwadi University", "Mediatek", "Microsoft", "Nation with Namo", "Natwest Group", "Nestle India", "Nexturn India Pvt. Ltd", "Nineleaps", "Nvidia", "Oceaneering", "Olx India Pvt. Ltd.", "Oracle", "PWC (PricewaterhouseCoopers)", "Paytm", "Philips", "Physics Wallah", "Planet Spark", "Pradan", "Pregard", "Qbit Labs Private Ltd.", "Qualcomm", "Quark", "Reliance Industries Limited", "SLO Technologies Private Limited (AdvaRisk)", "SRF Limited", "SRVA Education", "STMicroelectronics", "SUEZ Water Technology & Solutions", "SYNOPSYS", "Samsung Data Systems", "Samsung Electronics (Bangalore)", "Samsung Engineering India", "Samsung Research, Noida", "Samsung SSIR", "Samsung Semiconductior", "Schwing Stetter (India) Pvt. Ltd.", "Service Now", "Shapoorji Pallonji and Company Pvt. Ltd.", "Sids Farm Private Limited", "Siemens", "Signify", "Signify Innovations India Ltd.", "SoCtronics Technologies Pvt. Ltd.", "Software Engineer", "Spectra Medix", "Spinks World", "Standard Chartered GBS Pvt Ltd", "Steel Strips Wheels Limited.", "Strategic Reserarch Insights LLP-Hyderabad", "Streamsource Technologies India Pvt Ltd.", "Subros Limited", "Suzuki Motors Gujarat India Ltd.", "Tata Consultancy Services", "Tata Motors Ltd", "Technip Energies", "Tesco", "Texas Instruments", "Thrillophilia", "Toyo Ink", "Tredence Analytics", "Trianz Digital Solutions Pvt. Ltd", "Trident Group", "Truminds Software System", "Vardhman Textile", "Varun Beverages", "ZS Associates", "ZScaler", "Zethic Technologies", "Zomato", "o9 Solutions Management Private Ltd."]
    },
    '2022': {
      ugPlacement: [
        { department: 'CSE', percentage: 89.89 },
       { department: 'ECE', percentage: 92.31 },
  { department: 'EE', percentage: 85.71 },
  { department: 'IT', percentage: 85.71 },
  { department: 'CHE', percentage: 89.04 },
  { department: 'ICE', percentage: 91.30 },
  { department: 'CE', percentage: 51.25 },
  { department: 'IPE', percentage: 96.88 },
  { department: 'ME', percentage: 82.56 },
  { department: 'BT', percentage: 58.33 },
  { department: 'TT', percentage: 58.33 }
      ],
      ctcData: [
        { branch: 'CSE', ctc: 17.44 },
       { branch: 'ECE', ctc: 14.64 },
  { branch: 'EE', ctc: 12.21 },
  { branch: 'IT', ctc: 14.76 },
  { branch: 'CHE', ctc: 7.76 },
  { branch: 'ICE', ctc: 10.83 },
  { branch: 'CE', ctc: 6.94 },
  { branch: 'IPE', ctc: 6.93 },
  { branch: 'ME', ctc: 7.80 },
  { branch: 'BT', ctc: 7.62 },
  { branch: 'TT', ctc: 6.51 }
      ],
      ctcDistribution: [
        { name: 'Less than 5 LPA', value: 5.23, color: '#0369A0' },
        { name: '5+ LPA - 10 LPA', value: 68.45, color: '#FF8C42' },
        { name: '10+ LPA - 15 LPA', value: 15.67, color: '#008080' },
        { name: 'More than 15 LPA', value: 10.65, color: '#FFD700' }
      ],
      summaryStats: {
        percentagePlacement: '81.76%',
        totalOffers: '768',
        maxCTC: '1.2 Cr',
        avgCTC: '11.68 LPA'
      },
      companies: ["42Gears Mobility Systems Private Ltd.", "Aakash Institute", "Aarti Industries Limited", "Accenture", "Accolite Digital", "Accolite Digital (Hiring Challenge 13.0)", "Aditya Birla Grasim", "Adobe (PWD) Candidates", "Air Liquide Engineering & Construction", "Airtel International LLP", "Amazon", "Amazon WOW", "American Express", "Axis Bank Limited", "Azavista", "Bajaj Auto Limited", "Becton Dickinson India Pvt. Ltd.", "Bharat Electronics Limited", "Bosch Limited", "Byjus", "CDAC", "CGI India", "CJ Darcel Logistics Ltd.", "CROWE LLP", "Cadence", "Cairn Oil & Gas, Vedanta Ltd.", "Capgemini Solutions", "Cattleways Solutions Private Limited(Gaugau)", "Centify Technologies", "Clearwater Analytics India Pvt. Ltd.", "Cognizant", "Cogoport Pvt. Ltd.", "CollegeDunia", "ColudSufi", "Comviva", "Cubastion Consulting Pvt Ltd.", "Cummins India", "Cvent India Pvt. Ltd.", "Dealermatix", "Decathlon", "Decimal", "Delhivery Pvt. Ltd", "Deloitte Consulting India Private Limited", "EWar Games (GHack Technologies Pvt Ltd)", "EXL Service", "EY Global Delivery Services", "Engineers India Limited", "Fiat India Automobiles Pvt. Ltd.", "Ficode Software Solutions Private Ltd.", "Flipkart", "GFL Recruitment Pvt. Ltd.", "Genpact", "Goldman Sachs", "Google", "HLA Assia", "HR Trainee", "Havells India Limited", "Hero Motocorp Ltd.", "Hyundai Motor India Limited", "IOLCP", "IQuanti", "IRON Systems India", "Incedo", "Increff", "Indiamart Intermesh Limited", "Indian Institute of Remote Sensing", "Indus Valley Partners", "Infiiloom", "Infocusp Innovations Pvt. Ltd.", "Infoedge", "Infoedge India Ltd.", "Infosys", "Innovaccer", "Intel technology India Pvt. Ltd.", "Interra Systems", "JK Tyre & Industries Limited", "Jacobs", "Jaro Education", "Jellyfish Technologies", "Jindal Steel & Power Limited", "Jubilant Pharmova Limited", "KEC International Limited", "KPMG India", "Kore.AI Software India Pvt. Ltd", "Larsen&Tubro Limited", "Lentra AI Private Limited", "LnT Infotech", "Lowe's India", "MG Motors Ltd.", "Manikaran Analytics Ltd.", "Manjushree Pvt. Ltd.", "Maruti Suzuki India Limited", "Mediatak", "Mediatek India Technology Pvt. Ltd.", "Microsoft", "Mylofamily(Blupin Technologies Pvt Ltd)", "Nagarro Software (P)Ltd", "Nation With Namo", "National Fertilizers Limited, Nangal", "Natwestgroup", "Nuvoco Vistas Corp. Ltd.", "Nvidia", "O9 Solutions", "Optum (United Health Group Company)", "Optum (UnitedHealth Group Company)", "Oracle", "Oracle Financial Services Software ltd.(OFSS)", "Paytm", "People Strong Technologies", "Philips India Limited", "Philips Signify", "PhysicsWallah", "Planetspark", "Prism Johnson Limited", "Publicis Sapient", "Qualcomm", "Quantum Tele Solutions", "RSWM Limited", "Reliance Industries Limited", "Reliance Jio", "Researchwire Knowledge Solutions Pvt Ltd.", "Robomq", "SRF Limited", "SRVA Education", "Sabre Corporation", "Sagacious IP", "Sagar Manufacturers Pvt. Ltd.", "Saint-Gobain India Pvt. Ltd.", "Samsung Data Systems India Pvt. Ltd.", "Samsung Engineering India", "Samsung R&D Institute, Noida", "Samsung Research Bangalore", "Samsung Research Institute, Bangalore", "Service now", "Shapoorji Pallonji and Co. Pvt. Ltd.", "Spanidea Systems", "Spinks World", "Sportking", "Sprinklr", "Spyne Ai", "Standard Chartered GBS Pvt. Ltd.", "Steel Strips Wheels Limited", "Subros Limited", "Tata Power Company Limited", "TestBook", "Texas Instruments", "TheMathCompany", "Think Gas India Ltd.", "Tredence Analytics", "Trident Group", "Truminds Software System", "Vardhman Textile Limited", "Verse Innovaton Pvt. Ltd.", "Virtusa", "Welspun", "Wiingy", "Wipro Limited", "ZF Wabco India Ltd.", "ZS Assocates", "Zensar Technologies"]
    },
    '2021': {
     ugPlacement: [
        { department: 'CSE', percentage: 97.78 },
        { department: 'ECE', percentage: 81.48 },
        { department: 'CHE', percentage: 54.79 },
        { department: 'ICE', percentage: 84.29 },
        { department: 'CE', percentage: 37.84 },
        { department: 'IPE', percentage: 45.00 },
        { department: 'ME', percentage: 54.05 },
        { department: 'BT', percentage: 23.08 },
        { department: 'TT', percentage: 50.98 }
      ],
      ctcData: [
        { branch: 'CSE', ctc: 10.53 },
        { branch: 'ECE', ctc: 11.84 },
        { branch: 'CHE', ctc: 6.00 },
        { branch: 'ICE', ctc: 6.98 },
        { branch: 'CE', ctc: 5.70 },
        { branch: 'IPE', ctc: 5.95 },
        { branch: 'ME', ctc: 5.91 },
        { branch: 'BT', ctc: 5.49 },
        { branch: 'TT', ctc: 4.88 }
      ],
      ctcDistribution: [
        { name: 'Less than 5 LPA', value: 9.23, color: '#0369A0' },
        { name: '5+ LPA - 10 LPA', value: 71.45, color: '#FF8C42' },
        { name: '10+ LPA - 15 LPA', value:11.67, color: '#008080' },
        { name: 'More than 15 LPA', value: 7.65, color: '#FFD700' }
      ],
      summaryStats: {
        percentagePlacement: '63.44%',
        totalOffers: '419',
        maxCTC: '43.17 LPA',
        avgCTC: '8.24 LPA'
      },
      companies: ["42Gears Mobility Systems Private Limited", "Aakash Educational Service Ltd.", "Aarti Industries Limited", "Accenture", "Accolite Software India", "Afcons Infrastructure Limited", "Air Liquide Engineering & Contructions", "Air Liquide Global E&C Solution India Private Ltd.", "Amazon", "Apisero Inc", "Arvind Ltd.", "Avalara Technologies", "Axis Bank", "Bharat Electronics Limited", "Broadridge Financial", "CDAC Mohali", "CGI India", "Capgemini Solution India", "Cubastion Consulting Pvt Ltd", "Cvent India Pvt. Ltd.", "DE Show", "Daikin Airconditioning India Private Limited", "Delhivery", "Deloitte Consulting India Pvt. Ltd.", "Devkraft Technologies", "District Administration", "EXL Service", "Ericsson", "Escorts Kubota India Private Limited", "Evalueserve", "Fiat India Automobiles Pvt. Ltd.", "Gold Man Sach", "Greyb", "IOL Chemicals and Pharmaceuticals Limited", "IndiaMart Intermesh limited", "Indraprastha Gas Limited", "Indus Valley Partners", "Info Edge India Ltd.", "Infoedge", "Infosys", "Intel India Private Limited", "Interra Systems", "JSW Group", "Jindal Stainless Limited", "Jio Platforms Ltd.", "KEC International", "Larsen & Tubro", "Les Transformations Learning Pvt. Ltd.", "LnT Infotech", "Lowe's India", "Mahindra Comviva", "Maruti Suzuki India Ltd.", "Metso Outotec (MOGroup)", "Microsoft", "Mphasis", "Nagarro Software (P) Ltd", "National Fertilizers Ltd.", "Nokia Solutions and Network", "Octro(SGM Software Private Ltd.", "Omne Present Technologies,Pune", "Onebanc", "Optum (United Health Group)", "Optum(United Health Group)", "Oracle", "Oracle Financial Services Software ltd.", "Paytm", "Pinelabs", "Planetspark", "Plantspark", "RSWM Limited", "Raam Group", "Reliance JIO", "Renew Power Private Ltd.", "SRF Limited", "SRVA Education", "Sagacious IP", "Saint-Gobain India Private Ltd.", "Samsung Research Bangalore", "Samsung Research Institute Bangalore", "Samsung SDS", "Samsung Semiconductor", "Sapient Consulting Pvt. Ltd.", "Sigmoid Analytics", "Sliceit", "Sprinklr", "Standard Chartered GBS Pvt. Ltd.", "Subros Limited", "Sun Pharmaceutical Industries Ltd.", "Suzlon Energy Limited", "THINK Gas Distribution Pvt. Ltd.", "Tata Consultancy Services", "Tata Power Company Limited", "Technip", "The MathCompany", "TheMathCompany", "Times Internet", "Tredence Analytics", "Trident India Limited", "VA Tech Wabag Limited", "Vardhman", "Vardhman Textile", "Vivo Mobile India Pvt. Ltd.", "Webco India Limited", "Welspun", "Wipro Limited", "ZS Associate", "Ziploan", "eClerx Services Limited", "iQuanti India Pvt."]
    },
  };

  // Get current year data
  const currentData = yearlyData[selectedBatch];
  const ugPlacementData = currentData.ugPlacement;
  const ctcData = currentData.ctcData;
  const ctcDistribution = currentData.ctcDistribution;
  const summaryStats = currentData.summaryStats;
  const companies = currentData.companies;

  // Function to toggle showing all companies
  const toggleShowAllCompanies = () => {
    setShowAllCompanies(!showAllCompanies);
  };

  // Function to display companies in a grid
  const renderCompanies = () => {
    const companiesToShow = showAllCompanies ? companies : companies.slice(0, 30);
    
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Companies Visited ({selectedBatch} Batch)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {companiesToShow.map((company, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-3 text-gray-700 hover:text-custom-blue rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
            >
              <p className="text-sm font-medium ">{company}</p>
            </div>
          ))}
        </div>
        {companies.length > 30 && (
          <button
            onClick={toggleShowAllCompanies}
            className="mt-4 px-4 py-2 border border-custom-blue text-custom-blue rounded-lg hover:bg-custom-blue hover:text-white transition-colors"
          >
            {showAllCompanies ? 'Show Less' : `Show All (${companies.length})`}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 mt-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Placement <span className='text-custom-blue'>Statistics</span>
          </h1>
          
          {/* Header with batch selection */}
          <div className="mb-8">
            <div className="flex justify-center space-x-2 mb-6">
              {batches.map(batch => (
                <button
                  key={batch}
                  onClick={() => {
                    setSelectedBatch(batch);
                    setShowAllCompanies(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedBatch === batch
                      ? 'bg-custom-blue text-white border-2 border-custom-blue'
                      : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {batch} Batch
                </button>
              ))}
            </div>
          </div>
          
          {/* Summary Statistics */}
          <div className="bg-white rounded-xl py-2 px-4 mt-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-300 border border-blue-500 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-blue-700 mb-1">Percentage Placement</div>
                <div className="text-2xl font-bold text-blue-800">{summaryStats.percentagePlacement}</div>
              </div>
              <div className="bg-yellow-300 border border-yellow-500 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-yellow-700 mb-1">Total Number of Offers</div>
                <div className="text-2xl font-bold text-yellow-800">{summaryStats.totalOffers}</div>
              </div>
              <div className="bg-red-300 border border-red-500 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-red-700 mb-1">Maximum CTC Offered</div>
                <div className="text-2xl font-bold text-red-800">{summaryStats.maxCTC}</div>
              </div>
              <div className="bg-green-300 border border-green-500 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-green-700 mb-1">Average CTC Offered</div>
                <div className="text-2xl font-bold text-green-800">{summaryStats.avgCTC}</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* UG Percentage Placement Chart */}
            <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}>
              <h3 className="text-lg font-semibold text-gray-800 mb-8">
                UG Percentage Placement ({selectedBatch}-{(parseInt(selectedBatch) + 1).toString().slice(-2)})
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={ugPlacementData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="department" type="category" width={40} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Placement %']} />
                  <Bar dataKey="percentage" fill="#0369A0" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* CTC Distribution Pie Chart */}
            <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                CTC Offered
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={ctcDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                    labelLine={false}
                  >
                    {ctcDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {ctcDistribution.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-sm mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Branch wise Average CTC Chart */}
          <div className="bg-white rounded-xl p-6 mt-8" style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-8">
              Branch wise Average CTC Offered (in LPA)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={ctcData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="branch" 
                  angle={-45}
                  textAnchor="end"
                  height={10}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} LPA`, 'Average CTC']} />
                <Bar dataKey="ctc" fill="#0369A0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Companies Section */}
          <div className="bg-white rounded-xl p-6 mt-8" style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}>
            {renderCompanies()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Placementstatistics;