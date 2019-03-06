export const isString = (data: any): data is string => (
    typeof (<string>data) === 'string' && (<string>data).trim().length > 0
)