const verificationEmailTemplates = ({ name, url }) => {
  return `
        <p>Dear ${name},</p>
        <p>Thanks for the registring</p>
          <a href="${url}" style="color: white; background: #071263; margin-top: 10px;   padding: 10px; text-decoration: none; display: inline-block;">
           Verify Email
         </a>

    `
}
export default verificationEmailTemplates;