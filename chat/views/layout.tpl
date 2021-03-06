﻿<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>{% block title %}{% endblock %}</title>
  <link rel="stylesheet" href="css/bootstrap.min.css"/>
  <link rel="stylesheet" href="css/bootstrap-theme.min.css"/>
  <link rel="stylesheet" href="css/style.css"/>
</head>

<body>
  {% block content %}{% endblock %}
  <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
  <script type="text/javascript" src="js/bootstrap.min.js"></script>
  <script type="text/javascript" src="socket.io/socket.io.js"></script>
  {% block script %}{% endblock %}
</body>

</html>