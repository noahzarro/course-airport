const new_line = (name, hour, minute) => `
<div class="text-field">
<div style="display:inline-block; width:1200px">
    <div class="first-line name" style="display:inline-block">${name}</div>
</div>
<div class="first-line time" style="display:inline-block">${hour}:${minute}</div>
</div>
`;

function create_line(name, hour, minute) {
    let template_html = new_line(name, hour, minute)
    console.log(template_html)
    $("#text-fields-container").append(template_html)
}

function create_flips() {
    $('.first-line')
        .splitFlap({ image: "flip-res/images/chars.png" });
}

function clear_lines()

// create lines
$(document).ready(function() {
    create_flips();
});