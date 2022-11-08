function forms()
{
    const forms = document.createElement("div");
    const input = document.createElement("input");
    document.body.appendChild(forms);
    forms.appendChild(input);
    
    input.setAttribute("type", "submit");
    input.setAttribute("class", "submitData");
    input.setAttribute("value", "Send Data");   
}

