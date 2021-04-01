import { Notification } from "rsuite"

const notify = (funName, message)=>{
    Notification[funName]({
        title:funName,
        description: <h6>{message}</h6>
    });
}

export default notify;