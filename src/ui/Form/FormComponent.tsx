
const FormComponent = (props: React.HTMLProps<HTMLFormElement> ) => {
    return (
        <form {...props}>
            {props.children}
        </form>
    )
}

export default FormComponent;