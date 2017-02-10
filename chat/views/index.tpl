{% extends 'layout.tpl' %} 

{% block content %}
<div class="wrap">
  <div class="container-fluid">
    <h1>Welcome to the Node Chatroom</h1>
    <div id="messages"></div>
    <div class="push"></div>
  </div>
</div>
<div class="footer">
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-8 col-sm-9"><input type="text" id="message-box" placeholder="Write a message here..." rows="3" class="form-control input-lg"></div>
      <div class="col-xs-4 col-sm-3"><button id="send-message-btn" class="btn btn-primary btn-lg btn-block">Send Message</button></div>
    </div>
  </div>
</div>
{% endblock %}

{% block script %}
<script type="text/javascript" src="js/index.js"></script>
{% endblock %}
