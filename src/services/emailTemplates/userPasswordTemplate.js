module.exports = ({name,email},dynPass) => {
    return `
    <html>
    <body>
        <div style="text-align:center;">
        <h3>Hi ${name},</h3>
        <p>Congratulation for your registration!</p>
        <p>Your Email Id is ${email} and Password ${dynPass}</p>
    </body>
    </html>
    `;
}