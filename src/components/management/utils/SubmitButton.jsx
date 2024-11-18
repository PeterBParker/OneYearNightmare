

export default function SubmitButton({label, buttonID, isDisabled, isLoading}) {

    return (
        <button
            type="submit"
            id={buttonID}
            className={`${isDisabled ? "disabled" : "btn-std-hover"} btn py-2 w-full text-lg bg-green-confirm font-medium not-italic rounded`}
          >
            {isLoading ? (
              <div className="loader" style={{ width: 28, height: 28 }}></div>
            ) : (
              label
            )}
        </button>
    )
}