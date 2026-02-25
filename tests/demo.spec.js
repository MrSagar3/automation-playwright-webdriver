import {test,expect} from '@playwright/test'
import { firstName, lastName,email,message } from '../test-data/personInfo'
test('open website', async ({page})=>{
    await page.goto('https://webdriveruniversity.com')
})

test('open contact form', async ({page})=>{
    
    await page.goto('https://webdriveruniversity.com')
    
    await page.locator()
})

test('fill contact form and check success message', async ({page})=>{
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')

    await page.fill('input[name="first_name"]',firstName)
    await page.fill('input[name="last_name"]',lastName)
    await page.fill('input[name="email"]',email)
    await page.fill('textarea[name="message"]',message)
    await page.click('input[type="submit"]')

    await expect(page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact-form-thank-you.html')
    await expect(page.locator('h1')).toContainText('Thank You for your Message!')
})





