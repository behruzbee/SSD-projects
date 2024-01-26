interface IResponseData<T> {
	data: T
	result: T
	message: string
	error: SingleErrorType
}

export type SingleErrorType = {
	msg: string
}

export type ServerResponseType<T> = Promise<IResponseData<T>>

export type ServerErrorType = IResponseData<unknown>
