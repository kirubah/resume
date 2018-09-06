(async function(){

function q(selector){
    return document.querySelector(selector);
}
function getNode(s, nodeType='div'){
    const wrapper = document.createElement(nodeType);
    wrapper.innerHTML = s;
    return wrapper;
}
function list(items, nodeType='li'){
    return `${items.reduce((markup, a)=>markup+`<${nodeType}>${a}</${nodeType}>`, "")}`;
}
function idcard({name, title, location, linkedin, github}){
    return `
        <div class="idcard-name">${name}</div>
        <div class="idcard-title">${title}</div>
        <div class="idcard-location">${location}</div>
        <div><a href="${linkedin}" class="idcard-linkedin">${linkedin}</a></div>
        <div><a href="${github}" class="idcard-github">${github}</a></div>
    `;
}
function contact({address, mobile, email}){
    return `
        ${address.reduce((markup, a)=>markup+`<div>${a}</div>`, "")}
        <div>${mobile}</div>
        <div><a href="mailto:${email}" class="contact-email">${email}</a></div>
    `;
}
function experience(item){
    return `
        <div class="head">
            <div class="left">${item.title}</div>
            <div class="right">
                <div class="period">${item.period}</div>
                <div class="location">${item.location}</div>
            </div>
        </div>
        <ul>
            ${list(item.points)}
        </ul>
    `
}
function education(item){
    return `
    <div class="left">
        <div class="title">${item.title}</div>
        <div class="subtitle">${item.subtitle}</div>
    </div>
    <div class="right">
        <div class="period">${item.period}</div>
        <div class="grade">${item.grade}</div>
    </div>
    `   
}
const response = await fetch("json/main.json");
const resume = await response.json();
q("#idcard").appendChild(getNode(idcard(resume)));
q("#contact").appendChild(getNode(contact(resume)));
q("#profile").appendChild(getNode(`<p>${resume.profile}</p>`));
q("#languages").appendChild(getNode(list(resume.languages), 'ul'));
q("#tools").appendChild(getNode(list(resume.tools), 'ul'));
q("#others").appendChild(getNode(list(resume.others), 'ul'));
q("#experience").appendChild(
    getNode(
        list(
            resume.experience.map(experience),
            'div'
        )
    )
);
q("#education").appendChild(
    getNode(
        list(
            resume.education.map(education),
            'section'
        )
    )
)

})();