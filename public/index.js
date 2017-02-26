var smiley_btn = document.getElementById("smiley-container");
smiley_btn.onclick = function() {
    smiley_btn.classList.add("hidden");   
    document.getElementById("form-container").classList.remove("hidden");
};