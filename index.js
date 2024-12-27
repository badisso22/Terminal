const input_el = document.getElementById("prompt");
const output_el = document.getElementById("output");

input_el.addEventListener("keypress", handleKeypress);

let user = "user";

function handleKeypress (event) {
    const text = input_el.value;
    
    if (event.key !== "Enter" || text.length === 0) return; 
    
    message(user + "#~: " + text, "white");
    input_el.value = "";

    const args= text.trim().split(" ");
    const command = args.shift();

    switch (command) {
        case "about":
            return message("this is a Terminal that does basic commands , to understand it more type help !", "white");

        case "help":
            return message("Commands: help, echo <message>, <operator> <num1> <num2>,triangle <integer>,open <link>,clear , alert ,rename , color", "white");
            
        case "echo":
            return message(args.join(" "));
            
        case  "clear":
            return output_el.innerHTML = "";

        case "alert":
            return alert(args.join(" "));

        case "open": 
            return handleOpen(command, args);
    
        case "triangle":
            return handleTriangle(command, args);

        case "rename":
            return handleRename(command, args);
        case "color":
            return handleColor(command, args);    
        
        /*case "color":
            if (args.length < 1) {
                return message('Please provide a color.')
            }    

            else {
                let color = args[0];
                document.body.style.backgroundColor = color;
                message(`Changed color to ${color}.`);
            }

            break;*/

        case "add":
        case "+":
        case "sub":
        case "-":
        case "mul":
        case "*" :
        case "div":
        case "/":
            return handleBinary(command, args);
        
        case "cos":
            if (args.length !== 1) {
                return message('Please provide x')
            }

            else {
                let x = parseFloat(args[0]);
                message(`Result: ${Math.cos(x)}`);
            }

            break;
           
        default:
            message();
            break;
    }
}


function handleRename(command, arguments) {

	if (arguments.length < 1)
		return message('Error: Please provide a name.', 'orange');

	let newName = arguments[0];

	let oldName = user
	user = newName

	message(`Renamed ${oldName} to ${newName}`);
}


function handleClear(command, arguments) {
	output_el.innerHTML = ''

	message("Console is cleared.");
}


function handleAlert(command, arguments) {
	alert(arguments.join(' '));
}


function handleTriangle(command, args){
    if(args.length !==1){
        return message("please provide a triangle size.","orange");
    }
    for (let i = 0; i < parseInt(args[0]); i++) {
        let row ="";

        for (let j = 0; j < i; j++) {
            row += "*";
            
        }
        message(row);
        
    }

}


function handleOpen(_, args) {
    if (args.length < 1) {
        return message('You have provided no link!', "red");
    }

    let link = args[0];
    
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = "http://" + link;
    }

    message(`Opening ${link}...`);
    window.open(link, "_blank"); 
}



function handleColor(_, args) {
    if (args.length !== 1) {
        return message("Color expects a color for the first argument.", "orange");
    }

    document.body.style.backgroundColor = args[0];
    message(`Background changed to ${args[0]}`);
}


console.log(`Command: ${command}, Args: ${args}`);
console.log(`Command: ${command}, First: ${first}, Second: ${second}`);
function handleBinary(command, args) {
    if (args.length < 2) {
        return message("Please provide two numbers for the operation.", "orange");
    }

    const first = parseFloat(args[0]);
    const second = parseFloat(args[1]);

    if (isNaN(first) || isNaN(second)) {
        return message("Both arguments must be valid numbers.", "orange");
    }

    let result;

    switch (command) {
        case "add":
        case "+":
            result = first + second;
            break;

        case "sub":
        case "-":
            result = first - second;
            break;

        case "mul":
        case "*":
            result = first * second;
            break;

        case "div":
        case "/":
            if (second === 0) {
                return message("Error: Division by zero is not allowed.", "red");
            }
            result = first / second;
            break;

        default:
            return message(`Unknown operation: ${command}`, "red");
    }

    message(`Result: ${result}`);
}


function message (text, color = "green") {
    const p_el = document.createElement("p");

    p_el.innerText = text;
    p_el.style.color = color;

    output_el.appendChild(p_el);
    output_el.scrollTo({
        top: output_el.scrollHeight
    });

}