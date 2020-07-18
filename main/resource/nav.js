var flist = document.getElementsByClassName("nav-list");
        for(var i = 0; i < flist.length; i++){
            var h = flist[i].getElementsByTagName("h2")[0];
            h.onclick = function(){
                child = this.nextElementSibling;
                childs = this.firstElementChild;
                var h5s = child.getElementsByTagName("h5").length;
                var l = h5s * 50;
                l = l + 5 + "px";
                if(child.id === "active"){
                    child.id = "";
                    child.style.height = "0";
                    childs.style.transform="rotate(0deg)"
                    childs.style.transition = "0.5s";
                }else{
                    child.id = "active";
                    child.style.height = l;
                    childs.style.transform="rotate(90deg)"
                    childs.style.transition = "0.5s";
                }
            }
        }