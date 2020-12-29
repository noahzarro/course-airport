const new_line = (name, hour, minute) => `
<div class="text-field">
<div style="display:inline-block; width:1200px">
    <div class="first-line name" style="display:inline-block">${name}</div>
</div>
<div class="first-line time" style="display:inline-block">${hour}:${minute}</div>
</div>
`;

const default_name = "Kein Block             ";
const max_num_of_blocks = 5;
let current_first_block = -1;
let debug_time = 1602223013

function create_line(name, hour, minute, old_name, old_hour, old_minute) {
    let template_html = new_line(name, hour, minute)
    var new_element = $(template_html).appendTo("#text-fields-container")
    new_element.find(".name").splitFlap({
        image: "flip-res/images/chars.png",
        textInit: old_name,
        charsMap: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.,!?#@()+-=  :ÄÖÜ',
    });
    new_element.find(".time").splitFlap({
        image: "flip-res/images/chars.png",
        textInit: old_hour + ":" + old_minute,
        charsMap: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.,!?#@()+-=  :ÄÖÜ',
    });
}

function get_time() {
    //return Date.now()/1000;
    return debug_time;
}

function clear_lines() {
    $("#text-fields-container").empty();
}

function set_lines(repeat = false) {
    let blocks_added = 0;
    let prev_name = default_name;
    let prev_hour = "00";
    let prev_minute = "00";
    for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];

        if (block.time > get_time()) {
            if (blocks_added == 0) {
                if (current_first_block == block.id) {
                    break;
                } else {
                    current_first_block = block.id
                    clear_lines();
                }
            }

            create_line(block.name, block.hour, block.minute, prev_name, prev_hour, prev_minute);

            blocks_added++;

        }

        prev_name = block.name;
        prev_hour = block.hour;
        prev_minute = block.minute;

        if (blocks_added == max_num_of_blocks) {
            break;
        }
    }

    if (repeat) {
        setTimeout(set_lines, 60000, true)
    }
}
// create lines
$(document).ready(function() {
    set_lines(true)
});