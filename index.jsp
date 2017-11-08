<html>
<head>
    <script type="text/javascript" src="res/plugins/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="res/js/soapclient.js"></script>
    <script type="text/javascript">

    var url="http://localhost:8080/fujian-demo/service/InvestmentService";
    var p = new SOAPClientParameters();
    p.add("area", "350100");
    p.add("year", "2017");
    SOAPClient.explicitNS = true;
    SOAPClient.invoke(url, "constructionInvestment", p, true, HelloTo_callBack);
    
    function HelloTo_callBack(r)
    {
        alert(r);
    }

    </script>
</head>
<body>
<h2>Hello World!</h2>
</body>
</html>
