export const numberWithComas = (number, comas) => {
    let tmp = number ? number : 0
    return tmp
        .toString()
        .replace(
            /\B(?=(\d{3})+(?!\d))/g,
            comas,
        )
}