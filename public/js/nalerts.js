let alerts=document.getElementsByClassName('alert');

for (var i = 0; i < alerts.length; i++) {
  let alert_exit=document.createElement('div');
  alert_exit.id='alert__exit';
  alert_exit.innerHTML="&times";
  alerts[i].appendChild(alert_exit);
  alert_exit.addEventListener('click',function(){
    let parent=this.parentNode.parentNode,
    parentAlert=this.parentNode;
    parentAlert.className+=parentAlert.className+" outAnimation"
    let interval=setInterval(function(){
      console.log("HUNC");
      parent.removeChild(parentAlert);
      clearInterval(interval);
    },500);
  });
}
