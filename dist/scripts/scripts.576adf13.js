"use strict";angular.module("bulbasaur",["ngAnimate","ngMessages","ngRoute","angularMoment","ngTextTruncate","angular-loading-bar","duScroll","angulartics","angulartics.google.analytics","highcharts-ng","angularMoment"]).config(["$routeProvider","$locationProvider","cfpLoadingBarProvider",function(a,b,c){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"}),b.html5Mode(!0),c.spinnerTemplate='<div class="loader"><span>{</span><span>}</span></div>',(new WOW).init()}]),angular.module("bulbasaur").controller("MainCtrl",["$scope","$http","moment",function(a,b,c){function d(b){return"customrange"===b&&a.date.startdate&&a.date.enddate?"&start="+a.date.startdate+"&end="+a.date.enddate:""}a.age=_.floor(c.duration(c().diff(c("07-18-1988","MM-DD-YYYY"))).asYears()),a.empty=!0,a.skillSelect="thismonth",a.submit=function(){a.contactForm.$valid&&b.post("http://meowth1.herokuapp.com/mail",{name:a.contactForm.name.$viewValue,email:a.contactForm.email.$viewValue,message:a.contactForm.message.$viewValue}).then(function(b){b.status&&(a.submitted=!0)})},b.get("json/data.json").then(function(b){a.experiences=b.data.employment,a.projects=b.data.projects;var c=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);a.likes=_.chunk(b.data.likes,c?2:3),_.forEach(a.projects,function(b,c){a.projects[c].description_modified=_.join(b.description,"<br /><br />")})}),a.getSkills=function(e){a.empty=!1,b.get("https://wartortle.herokuapp.com?range="+e+d(e)).then(function(b){if(200===b.status){var d=b.data.Languages,e=b.data.Editors,f=b.data.Timeline,g=_.reduce(d,function(a,b){return a+b.total_seconds},0);_.forEach(d,function(a,b){d[b].y=_.round(a.total_seconds/g*100,2)}),_.forEach(e,function(a,b){e[b].y=_.round(a.total_seconds/g*100,2)}),a.chartLanguageConfig.series=[{data:d}],a.chartEditorConfig.series=[{data:e}],a.chartDateConfig.series=[{showInLegend:!1,data:_.map(f,"total_seconds").map(function(a){return _.round(a/3600,2)})}],a.chartDateConfig.xAxis={categories:_.map(f,"date").map(function(a){return c(a).format("MMM Do")})},(_.isEmpty(d)||_.isEmpty(e)||_.isEmpty(f))&&(a.empty=!0)}}),"customrange"===e&&$("#customRangeModal").modal("hide")},a.datePicker={date:{startDate:null,endDate:null}},a.getSkills(a.skillSelect),a.date={},a.skillChange=function(){"customrange"!==a.skillSelect?a.getSkills(a.skillSelect):($("#customRangeModal").modal("show"),$("#customRangeModal").on("shown.bs.modal",function(){$(".nav-tabs .active + li a").removeProp("data-toggle"),$("#datetimepicker1, #datetimepicker2").datetimepicker({inline:!0,useCurrent:!1,format:"L",maxDate:c(),minDate:c().subtract(1,"years")}).end().on("dp.change",function(b){"datetimepicker1"===b.target.id?(a.date.startdate=c(b.date).format("MMM Do YYYY"),$(".nav-tabs > .active + li a").trigger("click"),$("#datetimepicker2").data("DateTimePicker").minDate(c(b.date))):a.date.enddate=c(b.date).format("MMM Do YYYY"),a.$apply()})}))},a.chartLanguageConfig={chart:{type:"pie",width:$(".skills .col-md-6").width()},series:[{name:"Percentage",colorByPoint:!0,data:null}],tooltip:{headerFormat:"{point.key}: <b>{point.percentage:.1f}%</b>",pointFormat:""},title:{text:"Languages"},credits:{enabled:!1}},a.chartEditorConfig={chart:{type:"pie",width:$(".skills .col-md-6").width()},series:[{name:"Percentage",colorByPoint:!0,data:null}],tooltip:{headerFormat:"{point.key}: <b>{point.percentage:.1f}%</b>",pointFormat:""},title:{text:"Editors"},credits:{enabled:!1}},a.chartDateConfig={chart:{type:"line",width:$(".skills .col-md-12").width()},title:{text:"Coding Activity"},credits:{enabled:!1},tooltip:{pointFormat:"<b>{point.y} Hours</b>"},yAxis:{title:{text:"Hours"},plotLines:[{value:0,width:1,color:"#808080"}]}}}]).controller("NavCtrl",["$scope","$document",function(a,b){b.on("scroll",function(){a.showHeader=b.scrollTop()>100,a.$apply()})}]),angular.module("bulbasaur").run(["$templateCache",function(a){a.put("views/main.html",'<section class="home slide" id="home" data-slide="1" data-stellar-background-ratio="0.5"> <div class="row margin0"> <div class="home-img"> <div class="logo-holder"> <div class="logo top" align="center"> <span class="logo-blue">B</span> <div class="name">Braxton</div> </div> </div> <h1 class="fade-in">Front end developer.</h1> <h2 class="bottomTotop"><span class="blue">Think creatively.</span> Create continuously.</h2> </div> </div> </section> <section class="about slide" id="about" data-slide="2" data-stellar-background-ratio="0.5"> <div class="hello-box"> <div class="square"> <div class="pic"></div> </div> <h1 class="second hello wow slideInLeft">Hello!<br> I\'m Braxton Diggs.</h1> <h3>I\'m a {{age}} year old Web/Graphic Designer based in Silver Spring, Maryland, specializing in User Interface/Experience and Development. I build clean, appealing, and functional interfaces which comply with the latest and greatest web standards.</h3> </div> <section id="experience" class="scroll-section experience block"> <div class="container" style="overflow: hidden"> <h1 class="exp wow slideInDown">Experience</h1> <ul class="timeline"> <li> <ul> <li class="timeline-item highlight" ng-class-even="\'right\'" ng-repeat="experience in experiences"> <span class="exp-logo-holder"><img alt="{{experience.company}}" class="timeline-item-photo img-bg-primary" ng-src="{{experience.image.icon}}" ng-style="{\'margin\': experience.image.margin}"></span> <h4 class="timeline-item-date">{{experience.position}}</h4> <h5 class="timeline-item-role">{{experience.company}} ({{experience.location}})</h5> <h6>{{experience.date.start | amParse:\'MMMM YYYY\' | amDateFormat:\'MMMM YYYY\'}} <span class="grey"> &#8211; <span ng-if="!experience.date.end">Present</span><span ng-if="experience.date.end">{{experience.date.end | amParse:\'MMMM YYYY\' | amDateFormat:\'MMMM YYYY\'}} ({{experience.date.end | amDifference : experience.date.start : \'years\'}} Years)</span></span></h6> </li> </ul> </li> </ul> <div align="center" class="download-cv"> <a class="btn btn-large btn-primary btn-square" href="resume/braxton-diggs.pdf" target="_blank" analytics-on="click" analytics-event="Resume"><i class="icon-download-alt"></i>Download Resume</a> </div> </div> </section> </section> <section class="scroll-section slide skills" id="skills"> <div class="container"> <div class="zoomInRight wow"> <h1 class="skills">My "Real-Time" Activity</h1> <p class="center">See exactly when &amp; what my coding activity is using <a href="https://wakatime.com/">WakaTime</a>.</p> <div class="select" tabindex="1"> <input type="radio" class="selectopt" ng-model="skillSelect" ng-change="skillChange()" id="opt1" value="yesterday"> <label for="opt1" class="option">Yesterday</label> <input type="radio" ng-model="skillSelect" ng-change="skillChange()" id="opt2" value="last7days"> <label for="opt2" class="option">Last 7 Days</label> <input type="radio" ng-model="skillSelect" ng-change="skillChange()" id="opt3" value="last14days"> <label for="opt3" class="option">Last 14 Days</label> <input type="radio" ng-model="skillSelect" ng-change="skillChange()" id="opt4" value="last30days"> <label for="opt4" class="option">Last 30 Days</label> <input type="radio" ng-model="skillSelect" ng-change="skillChange()" id="opt5" value="thisweek"> <label for="opt5" class="option">This Week</label> <input type="radio" ng-model="skillSelect" ng-change="skillChange()" id="opt6" value="lastweek"> <label for="opt6" class="option">Last Week</label> <input type="radio" ng-model="skillSelect" ng-change="skillChange()" id="opt7" value="thismonth"> <label for="opt7" class="option">This Month</label> <input type="radio" ng-model="skillSelect" ng-change="skillChange()" id="opt8" value="lastmonth"> <label for="opt8" class="option">Last Month</label> <input type="radio" ng-model="skillSelect" ng-change="skillChange()" id="opt9" value="customrange"> <label for="opt9" class="option">Custom Range</label> </div> </div> <div class="row" ng-hide="empty"> <div class="col-md-6"> <highchart id="chart1" config="chartLanguageConfig"></highchart> </div> <div class="col-md-6"> <highchart id="chart2" config="chartEditorConfig"></highchart> </div> </div> <div class="row" ng-hide="empty"> <div class="col-md-12"> <highchart id="chart3" config="chartDateConfig"></highchart> </div> </div> <p ng-hide="!empty" class="empty">Looks I do not have any data for these dates. Use they dropdown above to try another date.</p> </div> <div id="customRangeModal" class="modal fade" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h4 class="modal-title">{{date.startdate}}</h4> <h4 class="modal-title">{{date.enddate}}</h4> </div> <div class="modal-body"> <ul class="nav nav-tabs" role="tablist"> <li role="presentation" class="active"><a data-target="#start" aria-controls="start" role="tab" data-toggle="tab">Start Date</a></li> <li role="presentation"><a data-target="#end" aria-controls="end" role="tab" data-toggle="tab">End Date</a></li> </ul> <div class="tab-content"> <div role="tabpanel" class="tab-pane active" id="start"> <div id="datetimepicker1"></div> </div> <div role="tabpanel" class="tab-pane" id="end"> <div id="datetimepicker2"></div> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> <button type="button" class="btn btn-primary" ng-click="getSkills(\'customrange\')">Save</button> </div> </div> </div> </div> </section> <section class="scroll-section slide work" id="work"> <div class="container padding0"> <h1 class="works wow zoomInUp">Working Projects</h1> <!--Featured item--> <ul id="work-list"> <li ng-class-even="\'right\'" ng-repeat="project in projects"> <div class="row"> <div class="col-md-3" ng-class="{\'col-md-push-9\': $odd}"> <a class="work-link" ng-href="{{project.url.web}}" target="_blank" analytics-on="click" analytics-category="Projects" analytics-event="{{project.title}}"> <img ng-src="{{project.image.icon}}" alt="{{project.title}}"> <span class="click">Click To View</span> </a> </div> <div class="list-content col-md-9" ng-class="{\'col-md-pull-3\': $odd}"> <h4>{{project.title}}</h4> <p ng-text-truncate="project.description_modified" ng-tt-words-threshold="60" ng-tt-more-label="Read More" ng-tt-less-label="Read Less"></p> <a ng-href="{{project.url.android}}" target="_blank" ng-if="project.url.android" analytics-on="click" analytics-category="Mobile" analytics-event="Android" analytics-label="{{project.title}}"><img style="width:150px;box-shadow: none" src="images/appstore_button_google.16c61f37.png"></a> <a ng-href="{{project.url.ios}}" target="_blank" ng-if="project.url.ios" analytics-on="click" analytics-category="Mobile" analytics-event="iOS" analytics-label="{{project.title}}"><img style="width:150px;box-shadow: none" src="images/Apple-Store-Button.82204d74.png"></a> <a ng-href="{{project.url.other}}" target="_blank" ng-if="project.url.other"><img style="width:150px;box-shadow: none" ng-src="{{project.image.other}}"></a> </div> </div> </li> </ul> </div> </section> <section class="scroll-section slide love" id="love"> <div class="container padding0"> <h1 class="wow rollIn">Things I <span class="icon-heart"></span></h1> <div class="row" ng-repeat="rows in likes"> <ul class="col-md-4 col-xs-6" ng-repeat="like in rows"> <li> <span class="icon-{{like.icon}}"></span><span>{{like.title}}</span></li> </ul> </div> </div> </section> <section class="slide scroll-section contact block" id="contact" data-slide="4" data-stellar-background-ratio="0.5"> <div id="map-container"> <div class="container"> <img src="images/braxton-contact.1c640817.jpg" alt=""> </div> </div> <div class="container"> <div id="contact-container" class="row"> <div class="col-md-4"> <h1 class="thanks">Contact Me</h1> <form id="contact-form" name="contactForm" ng-submit="submit()" ng-int="submitted = false;" ng-show="!submitted" novalidate> <div class="form-group"> <label for="name">Name:</label> <input type="text" class="form-control" id="name" name="name" tabindex="1" placeholder="Your Name" ng-model="name" required> <span style="color:red" ng-show="(contactForm.name.$dirty && contactForm.name.$invalid) || contactForm.$submitted"> <span ng-show="contactForm.name.$error.required">Your name is required.</span> </span> </div> <div class="form-group"> <label for="email">Email:</label> <input type="email" class="form-control" id="email" name="email" tabindex="2" placeholder="name@email.com" ng-model="email" required> <span style="color:red" ng-show="(contactForm.email.$dirty && contactForm.email.$invalid) || contactForm.$submitted"> <span ng-show="contactForm.email.$error.required">Your email is required.</span> <span ng-show="contactForm.email.$error.email">Invalid email address.</span> </span> </div> <div class="form-group"> <label for="message">Message:</label> <textarea class="form-control" id="message" name="message" rows="6" tabindex="3" placeholder="Add a brief message..." ng-model="message" minlength="15" required></textarea> <span style="color:red" ng-show="(contactForm.message.$dirty && contactForm.message.$invalid) || contactForm.$submitted"> <span ng-show="contactForm.message.$error.required">A message is required.</span> <span ng-show="contactForm.message.$error.minlength">Must be atleast 15 characters long.</span> </span> </div> <button type="submit" class="btn btn-default pull-right" ng-disabled="contactForm.$vaild">Submit</button> </form> <div id="confirmation" ng-show="submitted"> <h4>Message successfully sent.</h4> <p>I will responded to your email as soon as possible.</p> </div> </div> <div class="col-md-8"> <h3>Thanks for Visiting</h3> <p class="grey">I would love to hear what you think. Drop me a line, whether it is praise or criticism, a question, a suggestion, or just a hello. I am currently available for new projects, so if you have a request go ahead and send it!</p> <h3 style="margin-top:75px">Freelance & Other Contact</h3> <p class="grey">If you\'d like to contact me directly, please email me at <a href="mailto:braxtondiggs@gmail.com">braxtondiggs@gmail.com</a>. I can provide phone number and more information if the situation warrants.</p> <div class="logo-holder logo-holder2"> <div class="logo" align="center"> <span class="logo-blue">B</span> </div> </div> </div> </div> </div> </section> <footer> <div id="social"> <a href="https://www.facebook.com/BiggDiggz" target="_blank" analytics-on="click" analytics-category="Social" analytics-event="Facebook" title="Facebook"> <img src="images/socialmedia/Facebook.7403b584.png" alt=""> </a> <a href="https://github.com/braxtondiggs" target="_blank" title="Github" analytics-on="click" analytics-category="Social" analytics-event="GitHub"> <img src="images/socialmedia/Github.e0287070.png" alt="" style="width: 53px;margin: 0 15px"> </a> <a href="http://instagram.com/biggdiggz" target="_blank" title="Instagram" analytics-on="click" analytics-category="Social" analytics-event="Instagram"> <img src="images/socialmedia/Instagram.a1a0e094.png" alt=""> </a> <a href="mailto:braxtondiggs@gmail.com" target="_blank" title="Email" analytics-on="click" analytics-category="Social" analytics-event="Email"> <img src="images/socialmedia/Email.05043820.png" alt=""> </a> <a href="http://google.com/+BraxtonDiggs" target="_blank" title="Google+" analytics-on="click" analytics-category="Social" analytics-event="Google"> <img src="images/socialmedia/Google.5bf90caf.png" alt=""> </a> </div> <p style="margin-bottom:15px"><a href="https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f" target="_blank" analytics-on="click" analytics-event="Footer">How it feels to learn JavaScript in 2016&nbsp;<span class="icon-smile"></span></a></p> </footer>')}]);