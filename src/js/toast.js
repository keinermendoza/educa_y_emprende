// there are many assumptions here 
// toast element has the class toast
// SUCCESS_CLASS is present in the toast element

const dangerSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>`



export default function CustomToast({template_id, data}) {
    const SUCCESS_CLASS = "bg-cyan-400";
    const ERROR_CLASS = "bg-yellow-300";
    const TIME_VISIBLE = 5000;
    const ANIMATION_IN = "appears-500"
    const ANIMATION_OUT = "disappears-500"

    const template = document.getElementById(template_id);
    const fragment = template.content.cloneNode(true);
    const toast = fragment.querySelector("#toast");

    // changing icon and color when not sucessful status
    if (data.status !== 200) {
    toast.querySelector("#svg-container").innerHTML = dangerSvg; 
    
    toast.classList.remove(SUCCESS_CLASS);
    toast.classList.add(ERROR_CLASS);
    }
    // displaying toast message
    toast.querySelector("#toast-text-message").innerHTML = data.message;
    document.body.appendChild(toast);
    void toast.offsetWidth;

    // removing toast
    setTimeout(() => {
    toast.classList.remove(ANIMATION_IN);
    void toast.offsetWidth;
    toast.classList.add(ANIMATION_OUT);
    toast.onanimationend = () => toast.remove();

    },TIME_VISIBLE);
}