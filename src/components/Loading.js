const Loading = ({message}) => {
    return (
        <div className="flex justify-center items-center flex-col h-full">
            <div
                style={{ borderTopColor: "transparent" }}
                className="animate-spin loading" />
            <p className="mt-3">{message}</p>
        </div>
    )
}

export default Loading;