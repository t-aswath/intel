export const Admin = {
    getAdmin: "select * from doctor where uid = $1;",
    createAdmin: "update doctor set pass = $2 where uid = $1;",
}
