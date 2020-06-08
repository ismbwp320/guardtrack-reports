import mock from '@/fake-db/mock.js'

const data = {
  users: [
    {
      "_id": "5eda642dab1339cd7933a9c7",
      "index": 0,
      "c_name": "Roberta Phelps",
      "c_phone": "+1 (887) 575-2795",
      "c_mobile": "+1 (991) 546-3003",
      "c_address": "731 Veterans Avenue, Taycheedah, Connecticut, 3208",
      "c_email": "robertaphelps@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 641,
      "c_city": "Haena",
      "c_country": "Estonia"
    },
    {
      "_id": "5eda642d570d5cd14756e2c4",
      "index": 1,
      "c_name": "Amalia Rowe",
      "c_phone": "+1 (885) 408-3482",
      "c_mobile": "+1 (926) 581-2546",
      "c_address": "154 Degraw Street, Smock, District Of Columbia, 9611",
      "c_email": "amaliarowe@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 704,
      "c_city": "Dalton",
      "c_country": "Australia"
    },
    {
      "_id": "5eda642d94907020bcec001e",
      "index": 2,
      "c_name": "Park Kirk",
      "c_phone": "+1 (809) 486-3095",
      "c_mobile": "+1 (974) 534-3727",
      "c_address": "863 Argyle Road, Darlington, Minnesota, 3358",
      "c_email": "parkkirk@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 279,
      "c_city": "Wanamie",
      "c_country": "Guinea-Bissau"
    },
    {
      "_id": "5eda642d7fa1c94844c8380f",
      "index": 3,
      "c_name": "Burnett Bell",
      "c_phone": "+1 (814) 518-2818",
      "c_mobile": "+1 (960) 541-3591",
      "c_address": "552 Fleet Place, Malott, Idaho, 4789",
      "c_email": "burnettbell@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 105,
      "c_city": "Lookingglass",
      "c_country": "French Southern Territories"
    },
    {
      "_id": "5eda642d4db6fef631d406e6",
      "index": 4,
      "c_name": "Yolanda Sharpe",
      "c_phone": "+1 (944) 453-2417",
      "c_mobile": "+1 (963) 482-3837",
      "c_address": "138 Goodwin Place, Roland, Michigan, 1161",
      "c_email": "yolandasharpe@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 951,
      "c_city": "Hatteras",
      "c_country": "Ethiopia"
    },
    {
      "_id": "5eda642d48a96ef7b51cae85",
      "index": 5,
      "c_name": "Bryant Britt",
      "c_phone": "+1 (805) 447-3258",
      "c_mobile": "+1 (990) 593-2818",
      "c_address": "220 Bay Avenue, Freetown, Texas, 7389",
      "c_email": "bryantbritt@ginkle.com",
      "c_status": "pending",
      "c_postCode": 348,
      "c_city": "Sheatown",
      "c_country": "Ireland"
    },
    {
      "_id": "5eda642dc7d674edf5584e98",
      "index": 6,
      "c_name": "Tamika Cook",
      "c_phone": "+1 (892) 424-3226",
      "c_mobile": "+1 (916) 502-3173",
      "c_address": "632 Amherst Street, Strykersville, West Virginia, 7966",
      "c_email": "tamikacook@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 961,
      "c_city": "Ellerslie",
      "c_country": "Nigeria"
    },
    {
      "_id": "5eda642dca983d613c291e0d",
      "index": 7,
      "c_name": "Britt Cote",
      "c_phone": "+1 (806) 455-3004",
      "c_mobile": "+1 (903) 578-3613",
      "c_address": "849 Noll Street, Kaka, Illinois, 7336",
      "c_email": "brittcote@ginkle.com",
      "c_status": "active",
      "c_postCode": 665,
      "c_city": "Kenvil",
      "c_country": "Congo"
    },
    {
      "_id": "5eda642d5f38557d5ccb3e0a",
      "index": 8,
      "c_name": "Antonia Perkins",
      "c_phone": "+1 (857) 438-3652",
      "c_mobile": "+1 (993) 586-2927",
      "c_address": "933 Furman Avenue, Watrous, New York, 1904",
      "c_email": "antoniaperkins@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 649,
      "c_city": "Nelson",
      "c_country": "Libya"
    },
    {
      "_id": "5eda642d08724c641ce11a26",
      "index": 9,
      "c_name": "Steele Velasquez",
      "c_phone": "+1 (842) 491-2437",
      "c_mobile": "+1 (817) 410-2026",
      "c_address": "644 Pilling Street, Catharine, Nebraska, 6201",
      "c_email": "steelevelasquez@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 460,
      "c_city": "Bayview",
      "c_country": "Thailand"
    },
    {
      "_id": "5eda642dd738aa4692f4c559",
      "index": 10,
      "c_name": "Kristy Acevedo",
      "c_phone": "+1 (834) 519-2035",
      "c_mobile": "+1 (817) 550-3333",
      "c_address": "576 Kenilworth Place, Martell, Kentucky, 4472",
      "c_email": "kristyacevedo@ginkle.com",
      "c_status": "pending",
      "c_postCode": 741,
      "c_city": "Beaulieu",
      "c_country": "Puerto Rico"
    },
    {
      "_id": "5eda642d6052d537cfcd7ad5",
      "index": 11,
      "c_name": "Inez Brennan",
      "c_phone": "+1 (935) 584-2688",
      "c_mobile": "+1 (858) 530-2184",
      "c_address": "947 Ford Street, Boomer, Virginia, 3311",
      "c_email": "inezbrennan@ginkle.com",
      "c_status": "active",
      "c_postCode": 500,
      "c_city": "Celeryville",
      "c_country": "Benin"
    },
    {
      "_id": "5eda642dc0078812457f0824",
      "index": 12,
      "c_name": "Alfreda Hawkins",
      "c_phone": "+1 (851) 576-2113",
      "c_mobile": "+1 (938) 436-3091",
      "c_address": "306 Lee Avenue, Orick, Wisconsin, 5392",
      "c_email": "alfredahawkins@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 518,
      "c_city": "Martinsville",
      "c_country": "Finland"
    },
    {
      "_id": "5eda642de00b6d448ce9d2c2",
      "index": 13,
      "c_name": "Marie French",
      "c_phone": "+1 (973) 576-3002",
      "c_mobile": "+1 (896) 495-3985",
      "c_address": "888 Nelson Street, Edneyville, Georgia, 9590",
      "c_email": "mariefrench@ginkle.com",
      "c_status": "active",
      "c_postCode": 353,
      "c_city": "Wheaton",
      "c_country": "United States"
    },
    {
      "_id": "5eda642d4d75fff8bcef8047",
      "index": 14,
      "c_name": "Annette Meyers",
      "c_phone": "+1 (867) 564-2661",
      "c_mobile": "+1 (839) 555-2909",
      "c_address": "939 Wyona Street, Cartwright, Ohio, 7535",
      "c_email": "annettemeyers@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 907,
      "c_city": "Curtice",
      "c_country": "Reunion"
    },
    {
      "_id": "5eda642dfe56f35fc72f4263",
      "index": 15,
      "c_name": "Santana Montoya",
      "c_phone": "+1 (902) 596-2651",
      "c_mobile": "+1 (924) 402-3898",
      "c_address": "992 Madeline Court, Vincent, American Samoa, 8182",
      "c_email": "santanamontoya@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 534,
      "c_city": "Downsville",
      "c_country": "Yemen"
    },
    {
      "_id": "5eda642d3581eee1b3e3dd7d",
      "index": 16,
      "c_name": "Dorsey Molina",
      "c_phone": "+1 (934) 534-3149",
      "c_mobile": "+1 (802) 482-2688",
      "c_address": "122 Dewitt Avenue, Turpin, North Carolina, 2268",
      "c_email": "dorseymolina@ginkle.com",
      "c_status": "pending",
      "c_postCode": 649,
      "c_city": "Springhill",
      "c_country": "Tajikistan"
    },
    {
      "_id": "5eda642d47d3cb939dd02777",
      "index": 17,
      "c_name": "Savage Golden",
      "c_phone": "+1 (825) 593-3420",
      "c_mobile": "+1 (820) 402-3783",
      "c_address": "273 Fuller Place, Greenock, Rhode Island, 7864",
      "c_email": "savagegolden@ginkle.com",
      "c_status": "active",
      "c_postCode": 577,
      "c_city": "Roulette",
      "c_country": "Eritrea"
    },
    {
      "_id": "5eda642df9b3dab7ef352a10",
      "index": 18,
      "c_name": "Alice Humphrey",
      "c_phone": "+1 (997) 429-3813",
      "c_mobile": "+1 (954) 415-2901",
      "c_address": "783 Adler Place, Gardiner, California, 5666",
      "c_email": "alicehumphrey@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 327,
      "c_city": "Silkworth",
      "c_country": "Senegal"
    },
    {
      "_id": "5eda642d900c682774ace222",
      "index": 19,
      "c_name": "Mays Young",
      "c_phone": "+1 (996) 496-3139",
      "c_mobile": "+1 (852) 484-2536",
      "c_address": "296 Kingsway Place, Shasta, Arizona, 7849",
      "c_email": "maysyoung@ginkle.com",
      "c_status": "active",
      "c_postCode": 966,
      "c_city": "Whipholt",
      "c_country": "Trinidad and Tobago"
    },
    {
      "_id": "5eda642d51f9c0000bd748cd",
      "index": 20,
      "c_name": "Wyatt Malone",
      "c_phone": "+1 (980) 517-3567",
      "c_mobile": "+1 (958) 533-2577",
      "c_address": "709 Paerdegat Avenue, Inkerman, New Jersey, 6183",
      "c_email": "wyattmalone@ginkle.com",
      "c_status": "pending",
      "c_postCode": 896,
      "c_city": "Emison",
      "c_country": "Sao Tome and Principe"
    },
    {
      "_id": "5eda642d7467284321306815",
      "index": 21,
      "c_name": "Holcomb Bauer",
      "c_phone": "+1 (865) 518-3400",
      "c_mobile": "+1 (830) 489-3782",
      "c_address": "974 Kenmore Court, Williston, Indiana, 491",
      "c_email": "holcombbauer@ginkle.com",
      "c_status": "pending",
      "c_postCode": 699,
      "c_city": "Lindisfarne",
      "c_country": "Malawi"
    },
    {
      "_id": "5eda642df19385b28030e47d",
      "index": 22,
      "c_name": "Tabitha Rivers",
      "c_phone": "+1 (821) 587-3141",
      "c_mobile": "+1 (924) 545-2995",
      "c_address": "393 Dictum Court, Blandburg, South Dakota, 8562",
      "c_email": "tabitharivers@ginkle.com",
      "c_status": "active",
      "c_postCode": 380,
      "c_city": "Geyserville",
      "c_country": "Gambia"
    },
    {
      "_id": "5eda642dfc7fd895208e20eb",
      "index": 23,
      "c_name": "Peterson Guy",
      "c_phone": "+1 (907) 419-2425",
      "c_mobile": "+1 (920) 452-3879",
      "c_address": "872 Howard Place, Toftrees, Pennsylvania, 4545",
      "c_email": "petersonguy@ginkle.com",
      "c_status": "active",
      "c_postCode": 670,
      "c_city": "Ventress",
      "c_country": "Swaziland"
    },
    {
      "_id": "5eda642da88f1d64c1c3671e",
      "index": 24,
      "c_name": "Vaughan Whitfield",
      "c_phone": "+1 (881) 576-3967",
      "c_mobile": "+1 (817) 477-3155",
      "c_address": "153 Sumner Place, Gadsden, Tennessee, 8822",
      "c_email": "vaughanwhitfield@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 624,
      "c_city": "Robbins",
      "c_country": "East Timor"
    },
    {
      "_id": "5eda642da9fdcbaed899cd5c",
      "index": 25,
      "c_name": "Kidd Ortiz",
      "c_phone": "+1 (917) 433-3327",
      "c_mobile": "+1 (870) 507-2777",
      "c_address": "385 Autumn Avenue, Websterville, Missouri, 6157",
      "c_email": "kiddortiz@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 273,
      "c_city": "Cochranville",
      "c_country": "Cameroon"
    },
    {
      "_id": "5eda642d172db7f4e7756a21",
      "index": 26,
      "c_name": "Newton Fields",
      "c_phone": "+1 (886) 533-2319",
      "c_mobile": "+1 (857) 580-3320",
      "c_address": "960 Hall Street, Grimsley, Louisiana, 7669",
      "c_email": "newtonfields@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 667,
      "c_city": "Winesburg",
      "c_country": "Kuwait"
    },
    {
      "_id": "5eda642db582d75480a65947",
      "index": 27,
      "c_name": "Trudy Pace",
      "c_phone": "+1 (879) 412-2505",
      "c_mobile": "+1 (896) 426-3811",
      "c_address": "313 River Street, Caspar, South Carolina, 4417",
      "c_email": "trudypace@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 498,
      "c_city": "Cliff",
      "c_country": "Anguilla"
    },
    {
      "_id": "5eda642d094a332752511750",
      "index": 28,
      "c_name": "Adriana Velez",
      "c_phone": "+1 (827) 557-3535",
      "c_mobile": "+1 (856) 501-3007",
      "c_address": "733 Woodbine Street, Sabillasville, Maine, 4170",
      "c_email": "adrianavelez@ginkle.com",
      "c_status": "pending",
      "c_postCode": 732,
      "c_city": "Knowlton",
      "c_country": "Azerbaijan"
    },
    {
      "_id": "5eda642db745065273ef760c",
      "index": 29,
      "c_name": "House Castaneda",
      "c_phone": "+1 (866) 401-2365",
      "c_mobile": "+1 (909) 433-2650",
      "c_address": "935 Lake Street, Sharon, Hawaii, 8655",
      "c_email": "housecastaneda@ginkle.com",
      "c_status": "active",
      "c_postCode": 404,
      "c_city": "Evergreen",
      "c_country": "Syria"
    },
    {
      "_id": "5eda642d750ac9502658a828",
      "index": 30,
      "c_name": "Lopez Hendrix",
      "c_phone": "+1 (909) 594-2672",
      "c_mobile": "+1 (886) 407-3991",
      "c_address": "992 Joralemon Street, Brutus, Arkansas, 6091",
      "c_email": "lopezhendrix@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 410,
      "c_city": "Welch",
      "c_country": "Suriname"
    },
    {
      "_id": "5eda642db11d21bdbf90aa6e",
      "index": 31,
      "c_name": "Leonor Martinez",
      "c_phone": "+1 (838) 550-2278",
      "c_mobile": "+1 (957) 469-2331",
      "c_address": "891 Harrison Place, Rivera, Alabama, 6411",
      "c_email": "leonormartinez@ginkle.com",
      "c_status": "pending",
      "c_postCode": 924,
      "c_city": "Alafaya",
      "c_country": "Turks and Caicos Islands"
    },
    {
      "_id": "5eda642d21858854a946a191",
      "index": 32,
      "c_name": "Barrett Barron",
      "c_phone": "+1 (855) 474-2879",
      "c_mobile": "+1 (976) 539-2347",
      "c_address": "969 Cheever Place, Watchtower, Nevada, 690",
      "c_email": "barrettbarron@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 347,
      "c_city": "Bodega",
      "c_country": "Croatia (Hrvatska)"
    },
    {
      "_id": "5eda642d3a5f30b031819065",
      "index": 33,
      "c_name": "Webster Cunningham",
      "c_phone": "+1 (803) 545-2596",
      "c_mobile": "+1 (844) 418-2862",
      "c_address": "997 Kaufman Place, Grandview, Florida, 6221",
      "c_email": "webstercunningham@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 717,
      "c_city": "Collins",
      "c_country": "Netherlands"
    },
    {
      "_id": "5eda642d5833589b06a6e9dc",
      "index": 34,
      "c_name": "Nettie Dodson",
      "c_phone": "+1 (938) 522-2463",
      "c_mobile": "+1 (895) 508-2988",
      "c_address": "344 Coleridge Street, Goochland, Puerto Rico, 7435",
      "c_email": "nettiedodson@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 414,
      "c_city": "Brewster",
      "c_country": "Bosnia and Herzegovina"
    },
    {
      "_id": "5eda642d739c690e6d87fa3a",
      "index": 35,
      "c_name": "Vega Quinn",
      "c_phone": "+1 (935) 415-3915",
      "c_mobile": "+1 (848) 402-2110",
      "c_address": "280 Ashford Street, Westboro, Washington, 775",
      "c_email": "vegaquinn@ginkle.com",
      "c_status": "pending",
      "c_postCode": 161,
      "c_city": "Churchill",
      "c_country": "Jordan"
    },
    {
      "_id": "5eda642d3e033d082af61628",
      "index": 36,
      "c_name": "Rush Vasquez",
      "c_phone": "+1 (860) 440-2198",
      "c_mobile": "+1 (993) 554-2427",
      "c_address": "533 Bayview Place, Cumminsville, Iowa, 6612",
      "c_email": "rushvasquez@ginkle.com",
      "c_status": "active",
      "c_postCode": 329,
      "c_city": "Darbydale",
      "c_country": "Grenada"
    },
    {
      "_id": "5eda642d8857c176a2bae4b9",
      "index": 37,
      "c_name": "Annabelle Beck",
      "c_phone": "+1 (824) 569-3378",
      "c_mobile": "+1 (944) 436-2947",
      "c_address": "148 Seaview Avenue, Leeper, Oklahoma, 4740",
      "c_email": "annabellebeck@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 156,
      "c_city": "Beyerville",
      "c_country": "Mali"
    },
    {
      "_id": "5eda642dc30030e1238ceb38",
      "index": 38,
      "c_name": "Bridget Peters",
      "c_phone": "+1 (992) 579-3751",
      "c_mobile": "+1 (994) 597-3795",
      "c_address": "126 Norfolk Street, Chalfant, Colorado, 7885",
      "c_email": "bridgetpeters@ginkle.com",
      "c_status": "active",
      "c_postCode": 675,
      "c_city": "Tryon",
      "c_country": "Saint Lucia"
    },
    {
      "_id": "5eda642d61b91fc195fe7979",
      "index": 39,
      "c_name": "Francine Orr",
      "c_phone": "+1 (864) 448-2077",
      "c_mobile": "+1 (843) 574-3667",
      "c_address": "206 Dean Street, Eastmont, Guam, 3833",
      "c_email": "francineorr@ginkle.com",
      "c_status": "active",
      "c_postCode": 647,
      "c_city": "Elliston",
      "c_country": "Egypt"
    },
    {
      "_id": "5eda642db552ccd356304907",
      "index": 40,
      "c_name": "Rosa Allen",
      "c_phone": "+1 (873) 572-2579",
      "c_mobile": "+1 (885) 478-3555",
      "c_address": "599 Portland Avenue, National, Mississippi, 9410",
      "c_email": "rosaallen@ginkle.com",
      "c_status": "active",
      "c_postCode": 251,
      "c_city": "Eggertsville",
      "c_country": "Svalbard and Jan Mayen Islands"
    },
    {
      "_id": "5eda642d78e9f52cb44cb60d",
      "index": 41,
      "c_name": "Odonnell Reed",
      "c_phone": "+1 (833) 574-2395",
      "c_mobile": "+1 (945) 414-2307",
      "c_address": "385 Highlawn Avenue, Carrsville, Maryland, 886",
      "c_email": "odonnellreed@ginkle.com",
      "c_status": "pending",
      "c_postCode": 405,
      "c_city": "Albrightsville",
      "c_country": "Djibouti"
    },
    {
      "_id": "5eda642dd1d52ad8075867e8",
      "index": 42,
      "c_name": "Edna Roy",
      "c_phone": "+1 (837) 437-2149",
      "c_mobile": "+1 (983) 564-3384",
      "c_address": "710 Stewart Street, Westmoreland, Palau, 5707",
      "c_email": "ednaroy@ginkle.com",
      "c_status": "pending",
      "c_postCode": 380,
      "c_city": "Zarephath",
      "c_country": "Malaysia"
    },
    {
      "_id": "5eda642ddac0cbf5a2d52522",
      "index": 43,
      "c_name": "Wallace Mckay",
      "c_phone": "+1 (927) 422-2907",
      "c_mobile": "+1 (940) 501-2672",
      "c_address": "938 Sedgwick Place, Drytown, Alaska, 2919",
      "c_email": "wallacemckay@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 529,
      "c_city": "Aurora",
      "c_country": "Honduras"
    },
    {
      "_id": "5eda642d2d542a2d93f662e4",
      "index": 44,
      "c_name": "Lucille Clarke",
      "c_phone": "+1 (822) 524-3895",
      "c_mobile": "+1 (842) 554-2005",
      "c_address": "749 Kings Hwy, Shrewsbury, Oregon, 7571",
      "c_email": "lucilleclarke@ginkle.com",
      "c_status": "active",
      "c_postCode": 912,
      "c_city": "Fingerville",
      "c_country": "Slovak Republic"
    },
    {
      "_id": "5eda642dd0b7713f5107871b",
      "index": 45,
      "c_name": "Wiggins Carey",
      "c_phone": "+1 (874) 422-3542",
      "c_mobile": "+1 (918) 404-3544",
      "c_address": "750 Emerson Place, Ahwahnee, Wyoming, 879",
      "c_email": "wigginscarey@ginkle.com",
      "c_status": "active",
      "c_postCode": 669,
      "c_city": "Remington",
      "c_country": "Malta"
    },
    {
      "_id": "5eda642d388a6d4de346ac22",
      "index": 46,
      "c_name": "Josefina Ross",
      "c_phone": "+1 (911) 528-2941",
      "c_mobile": "+1 (940) 488-2865",
      "c_address": "694 Monroe Place, Falconaire, Utah, 8637",
      "c_email": "josefinaross@ginkle.com",
      "c_status": "active",
      "c_postCode": 610,
      "c_city": "Conway",
      "c_country": "Myanmar"
    },
    {
      "_id": "5eda642d414e5b7bfe8b921e",
      "index": 47,
      "c_name": "Terra Ellis",
      "c_phone": "+1 (992) 463-3294",
      "c_mobile": "+1 (887) 575-2009",
      "c_address": "710 Stockton Street, Delco, Northern Mariana Islands, 3441",
      "c_email": "terraellis@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 884,
      "c_city": "Dragoon",
      "c_country": "Bahrain"
    },
    {
      "_id": "5eda642d78c0b3efb67d1351",
      "index": 48,
      "c_name": "Tillman Kline",
      "c_phone": "+1 (966) 548-3541",
      "c_mobile": "+1 (842) 483-3727",
      "c_address": "672 Hamilton Avenue, Glenbrook, Marshall Islands, 786",
      "c_email": "tillmankline@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 668,
      "c_city": "Marbury",
      "c_country": "Panama"
    },
    {
      "_id": "5eda642dd9f536f12bb6a011",
      "index": 49,
      "c_name": "Laurel Crane",
      "c_phone": "+1 (937) 545-3178",
      "c_mobile": "+1 (865) 565-2768",
      "c_address": "872 Wortman Avenue, Golconda, New Mexico, 5356",
      "c_email": "laurelcrane@ginkle.com",
      "c_status": "pending",
      "c_postCode": 985,
      "c_city": "Woodlake",
      "c_country": "Solomon Islands"
    },
    {
      "_id": "5eda642d4887217351b9a152",
      "index": 50,
      "c_name": "Cervantes Ware",
      "c_phone": "+1 (914) 570-2696",
      "c_mobile": "+1 (996) 557-2221",
      "c_address": "427 Ashland Place, Loyalhanna, North Dakota, 2596",
      "c_email": "cervantesware@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 340,
      "c_city": "Sardis",
      "c_country": "Northern Mariana Islands"
    },
    {
      "_id": "5eda642d40c54340bd06cd69",
      "index": 51,
      "c_name": "Lenora Barnes",
      "c_phone": "+1 (827) 510-3276",
      "c_mobile": "+1 (874) 400-2031",
      "c_address": "504 Cox Place, Hackneyville, New Hampshire, 1559",
      "c_email": "lenorabarnes@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 410,
      "c_city": "Eureka",
      "c_country": "Cocos (Keeling Islands)"
    },
    {
      "_id": "5eda642dfdd392d68286bbbe",
      "index": 52,
      "c_name": "Vazquez Leon",
      "c_phone": "+1 (958) 565-3531",
      "c_mobile": "+1 (834) 485-2422",
      "c_address": "879 Nolans Lane, Bynum, Federated States Of Micronesia, 5270",
      "c_email": "vazquezleon@ginkle.com",
      "c_status": "deactivated",
      "c_postCode": 559,
      "c_city": "Stagecoach",
      "c_country": "Cuba"
    },
    {
      "_id": "5eda642d24836ebd8c6421ad",
      "index": 53,
      "c_name": "Rachael Garner",
      "c_phone": "+1 (981) 516-3109",
      "c_mobile": "+1 (945) 433-2561",
      "c_address": "529 Aster Court, Bonanza, Kansas, 6085",
      "c_email": "rachaelgarner@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 332,
      "c_city": "Edgar",
      "c_country": "Iceland"
    },
    {
      "_id": "5eda642d8d716373d36bc6e3",
      "index": 54,
      "c_name": "Lindsay Summers",
      "c_phone": "+1 (843) 470-2199",
      "c_mobile": "+1 (947) 524-2969",
      "c_address": "477 Franklin Avenue, Aberdeen, Delaware, 526",
      "c_email": "lindsaysummers@ginkle.com",
      "c_status": "inactive",
      "c_postCode": 755,
      "c_city": "Muir",
      "c_country": "Guadeloupe"
    }
  ]
}


mock.onGet('/api/user-management/users').reply(() => {
  return [200, JSON.parse(JSON.stringify(data.users)).reverse()]
})

// GET: Fetch Single User Details
mock.onGet(/\/api\/user-management\/users\/\d+/).reply((request) => {
  
  const userId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const user = data.users.find((user) => user.index == userId)


  return user ? [200, JSON.parse(JSON.stringify(user))] : [404]
})

// // POST : Add new Item
// mock.onPost("/api/data-list/products/").reply((request) => {

//   // Get event from post data
//   let item = JSON.parse(request.data).item

//   const length = data.products.length
//   let lastIndex = 0
//   if(length){
//     lastIndex = data.products[length - 1].id
//   }
//   item.id = lastIndex + 1

//   data.products.push(item)

//   return [201, {id: item.id}]
// })

// // Update Product
// mock.onPost(/\/api\/data-list\/products\/\d+/).reply((request) => {

//   const itemId = request.url.substring(request.url.lastIndexOf("/")+1)

//   let item = data.products.find((item) => item.id == itemId)
//   Object.assign(item, JSON.parse(request.data).item)

//   return [200, item]
// })

// // DELETE: Remove Item
mock.onDelete(/\/api\/user-management\/users\/\d+/).reply((request) => {

  const userId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const itemIndex = data.users.findIndex((p) => p.index == userId)
  data.users.splice(itemIndex, 1)
  return [200]
})
