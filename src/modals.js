import EditTodoModal from "./components/modals/EditTodoModal"
import PasswordReset from "./components/modals/PasswordReset"
import ReAuthModal from "./components/modals/ReAuthModal"
const modals = [
    {
        name:"re-auth-modal",
        element:ReAuthModal
    },
    {
        name:"edit-todo-modal",
        element:EditTodoModal

    },
    {
        name:"password-reset-modal",
        element:PasswordReset
    }
]
export default modals