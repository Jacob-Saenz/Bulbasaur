"use strict";function onLoad(){$(window).scroll(function(){$(this).scrollTop()>100?$("[data-js=scroll-show]").addClass("scroll-show").fadeIn("slow"):$("[data-js=scroll-show]").removeClass("scroll-show").fadeOut("slow")});var a=$("#work").offset().top;$(window).scroll(function(){$(window).scrollTop()>a?$("body").addClass("navbar-fixated"):$("body").removeClass("navbar-fixated")}),$(".navbar-toggle").click(function(){$(".navbar-collapse").slideToggle()}),$(".scroll").click(function(a){a.preventDefault(),$("html,body").animate({scrollTop:$(this.hash).offset().top},500)}),$(window).scroll(function(){$(this).scrollTop()>50?$(".menu").fadeIn():$(".menu").fadeOut(),$(this).scrollTop()>550&&$(".second").addClass("fade-in2"),$(this).scrollTop()>1e3&&$(".exp").addClass("left-new"),$(this).scrollTop()>2e3&&$(".works").addClass("left-new2")})}angular.module("bulbasaur",["ngAnimate","ngMessages","ngRoute","chart.js","angularMoment","ngTextTruncate"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("bulbasaur").controller("MainCtrl",["$scope","$http","$timeout",function(a,b,c){c(function(){onLoad()},500);var d=new Date;a.myForm={},a.age=parseInt(d.getFullYear()-1988,10),a.submit=function(){$("#contact-form").fadeOut("slow",function(){$("#confirmation").fadeIn("slow")})},b.get("json/data.json").then(function(b){a.experiences=b.data.employment,a.projects=b.data.projects,a.likes=_.chunk(b.data.likes,3),_.forEach(a.projects,function(b,c){a.projects[c].description_modified=_.join(b.description,"<br /><br />")})}),a.chart={xLabel:{backend:["",[["Yes,"],["I know"]],[["Promising"],["Maniac"]],[["Powerful"],["Insider"]],[["Inspiring"],["Teacher"]],[["Breath-taking"],["Visionary"]]]},frontend:{},labels:{backend:["Android SDK","PHP","Java","Swift",".NET","Rails"],frontend:[]},options:{tooltips:{enabled:!1},responsive:!0,scales:{xAxes:[{position:"top",stacked:!1,gridLines:{display:!1},ticks:{callback:function(b,c){return a.chart.xLabel[c]},max:100,min:0,stepSize:20,beginAtZero:!1,padding:-20,fontFamily:"BandaRegular",fontColor:"#1caedd"}}],yAxes:[{gridLines:{display:!1},stacked:!0,categoryPercentage:1,barPercentage:1,fontFamily:"BandaRegular"}]}},data:{backend:[80,60,80,20,40,20],frontend:[]},override:{borderWidth:0}}}]),angular.module("bulbasaur").run(["$templateCache",function(a){a.put("views/main.html",'<section class="home slide" id="home" data-slide="1" data-stellar-background-ratio="0.5"> <div class="row margin0"> <div class="home-img"> <div class="logo-holder"> <div class="logo top" align="center"> <span class="logo-blue">B</span> <div class="name">Braxton</div> </div> </div> <h1 class="fade-in">Front end developer.</h1> <h2 class="bottomTotop"><span class="blue">Think creatively.</span> Create continuously.</h2> </div> </div> </section> <section class="about slide" id="about" data-slide="2" data-stellar-background-ratio="0.5"> <div class="hello-box"> <div class="square"> <div class="pic"></div> </div> <h1 class="second hello">Hello!<br> I\'m Braxton Diggs.</h1> <h3>I\'m a {{age}} year old Web/Graphic Designer based in Silver Spring, Maryland, specializing in User Interface/Experience and Development. I build clean, appealing, and functional interfaces which comply with the latest and greatest web standards.</h3> </div> <section id="experience" class="scroll-section experience block"> <div class="container" style="overflow: hidden"> <h1 class="exp">Experience</h1> <ul class="timeline"> <li> <ul> <li class="timeline-item highlight" ng-class-even="\'right\'" ng-repeat="experience in experiences"> <span class="exp-logo-holder"><img alt="{{experience.company}}" class="timeline-item-photo img-bg-primary" ng-src="{{experience.image.icon}}" ng-style="{\'margin\': experience.image.margin}"></span> <h4 class="timeline-item-date">{{experience.position}}</h4> <h5 class="timeline-item-role">{{experience.company}} ({{experience.location}})</h5> <h6>{{experience.date.start | amUtc| amDateFormat:\'MMMM YYYY\'}} <span class="grey"> &#8211; <span ng-if="!experience.date.end">Present</span><span ng-if="experience.date.end">{{experience.date.end | amUtc| amDateFormat:\'MMMM YYYY\'}} ({{experience.date.end | amDifference : experience.date.start : \'years\'}} Years)</span></span></h6> </li> </ul> </li> </ul> <div align="center" class="download-cv"> <a class="btn btn-large btn-primary btn-square" href="resume/braxton-diggs.pdf" target="_blank"><i class="icon-download-alt"></i>Download Resume</a> </div> </div> </section> </section> <!--<section class="scroll-section slide skills" id="skills">\n  <div class="container">\n    <div class="row">\n      <div class="col-md-6">\n        <canvas id="base-front" class="chart-horizontal-bar" chart-data="chart.data.frontend" chart-labels="chart.labels.frontend" chart-options="chart.options" chart-dataset-override="chart.override"></canvas>\n      </div>\n      <div class="col-md-6">\n        <canvas id="base-back" class="chart-horizontal-bar" chart-data="chart.data.backend" chart-labels="chart.labels.backend" chart-options="chart.options" chart-dataset-override="chart.override"></canvas>\n      </div>\n    </div>\n  </div>\n</section>--> <section class="scroll-section slide work" id="work"> <div class="container padding0"> <h1 class="works">Working Projects</h1> <!--Featured item--> <ul id="work-list"> <li ng-class-even="\'right\'" ng-repeat="project in projects"> <div class="row"> <div class="col-md-3" ng-class="{\'col-md-push-9\': $odd}"> <a class="work-link" ng-href="{{project.url.web}}" target="_blank"> <img ng-src="{{project.image.icon}}" alt="{{project.title}}"> <span class="click">Click To View</span> </a> </div> <div class="list-content col-md-9" ng-class="{\'col-md-pull-3\': $odd}"> <h4>{{project.title}}</h4> <p ng-text-truncate="project.description_modified" ng-tt-words-threshold="60" ng-tt-more-label="Read More" ng-tt-less-label="Read Less"></p> <a ng-href="{{project.url.android}}" target="_blank" ng-if="project.url.android"><img style="width:150px;box-shadow: none" src="images/appstore_button_google.16c61f37.png"></a> <a ng-href="{{project.url.ios}}" target="_blank" ng-if="project.url.ios"><img style="width:150px;box-shadow: none" src="images/Apple-Store-Button.82204d74.png"></a> </div> </div> </li> </ul> </div> </section> <section class="scroll-section slide love" id="love"> <div class="container padding0"> <h1>Things I <span class="icon-heart"></span></h1> <div class="row" ng-repeat="rows in likes"> <ul class="col-md-4" ng-repeat="like in rows"> <li> <span class="icon-{{like.icon}}"></span><span>{{like.title}}</span></li> </ul> </div> </div> </section> <section class="slide scroll-section contact block" id="contact" data-slide="4" data-stellar-background-ratio="0.5"> <div id="map-container"> <img src="images/braxton-contact.1c640817.jpg" alt=""> </div> <div class="container"> <div id="contact-container" class="row"> <div class="col-md-4"> <h1 class="thanks">Contact Me</h1> <form id="contact-form" role="form" name="myForm" ng-submit="submit()" novalidate> <div class="form-group"> <label for="name">Name:</label> <input type="text" class="form-control" id="name" name="name" tabindex="1" placeholder="Your Name" ng-model="name" required> <span style="color:red" ng-show="myForm.name.$dirty && myForm.name.$invalid"> <span ng-show="myForm.name.$error.required">Your name is required.</span> </span> </div> <div class="form-group"> <label for="email">Email:</label> <input type="email" class="form-control" id="email" name="email" tabindex="2" placeholder="name@email.com" ng-model="email" required> <span style="color:red" ng-show="myForm.email.$dirty && myForm.email.$invalid"> <span ng-show="myForm.email.$error.required">Your email is required.</span> <span ng-show="myForm.email.$error.email">Invalid email address.</span> </span> </div> <div class="form-group"> <label for="message">Message:</label> <textarea class="form-control" id="message" name="message" rows="6" tabindex="3" placeholder="Add a brief message..."></textarea> </div> <button type="submit" class="btn btn-default pull-right" ng-disabled="myForm.name.$dirty && myForm.name.$invalid || myForm.email.$dirty && myForm.email.$invalid">Submit</button> </form> <div id="confirmation"> <h4>Message successfully sent.</h4> <p>I will responded to your email as soon as possible.</p> </div> </div> <div class="col-md-8"> <h3>Thanks for Visiting</h3> <p class="grey">I would love to hear what you think. Drop me a line, whether it is praise or criticism, a question, a suggestion, or just a hello. I am currently available for new projects, so if you have a request go ahead and send it!</p> <h3 style="margin-top:75px">Freelance & Other Contact</h3> <p class="grey">If you\'d like to contact me directly, please email me at <a href="mailto:braxtondiggs@gmail.com">braxtondiggs@gmail.com</a>. I can provide phone number and more information if the situation warrants.</p> <div class="logo-holder logo-holder2"> <div class="logo" align="center"> <span class="logo-blue">B</span> </div> </div> </div> </div> </div> </section> <footer> <div id="social"> <a href="https://www.facebook.com/BiggDiggz" target="_blank" title="Facebook"> <img src="images/socialmedia/Facebook.7403b584.png" alt=""> </a> <a href="https://github.com/braxtondiggs" target="_blank" title="Github"> <img src="images/socialmedia/Github.e0287070.png" alt="" style="width: 53px;margin: 0 15px"> </a> <a href="http://instagram.com/biggdiggz" target="_blank" title="Instagram"> <img src="images/socialmedia/Instagram.a1a0e094.png" alt=""> </a> <a href="mailto:braxtondiggs@gmail.com" target="_blank" title="Email"> <img src="images/socialmedia/Email.05043820.png" alt=""> </a> <a href="http://google.com/+BraxtonDiggs" target="_blank" title="Google+"> <img src="images/socialmedia/Google.5bf90caf.png" alt=""> </a> </div> <p style="margin-bottom:15px"><a href="https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f" target="_blank">How it feels to learn JavaScript in 2016&nbsp;<span class="icon-smile"></span></a></p> </footer>')}]);