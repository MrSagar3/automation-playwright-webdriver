const {expect} = require('@playwright/test');

exports.contact= class contact {
    constructor(page){
        this.page=page
        this.url='https://webdriveruniversity.com/Contact-Us/contactus.html'

        this.FirstName=page.locator('input[name="first_name"]')
        this.LastName=page.locator('input[name="last_name"]')
        this.Email=page.locator('input[name="email"]')
        this.Message=page.locator('textarea[name="message"]')
        this.Submit =page.locator('input[type="submit"]')
        this.reset=page.locator('input[type="reset"]')
        this.successurl='https://webdriveruniversity.com/Contact-Us/contact-form-thank-you.html'
        this.notsuccessurl='https://webdriveruniversity.com/Contact-Us/contact_us.php'
    }

    async navigate(){
        await this.page.goto(this.url)
    }


    async fill(FirstName,LastName,Email,Message){
        await this.FirstName.fill(FirstName)
        await this.LastName.fill(LastName)
        await this.Email.fill(Email)
        await this.Message.fill(Message)
    }

    async submitClick(){
        await this.Submit.click()
    }

    successUrlCheck(){
        return expect(this.page).toHaveURL(this.successurl)
    }

    successMessageCheck(){
        return this.page.locator("//h1[normalize-space()?']")
    }

    notsuccessUrlCheck(){
        return expect(this.page).toHaveURL(this.notsuccessurl)
    }

    invalidEmailMessageCheck(){
        return this.page.locator('body')
    }

    emptyInputFieldMessageCheck(){
        return this.page.locator('body')
    }

    characterLimitMessageCheck(){
        return this.page.locator('body')
    }

   async resetButtonCheck(){
        await this.reset.click()
        await expect(this.FirstName).toHaveValue('')
        await expect(this.LastName).toHaveValue('')
        await expect(this.Email).toHaveValue('')
        await expect(this.Message).toHaveValue('')
    }

}