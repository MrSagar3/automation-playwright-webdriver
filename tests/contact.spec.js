import {test,expect} from '@playwright/test'
import { firstName, lastName,email,message } from '../test-data/personInfo'

test('open website', async ({page})=>{
    await page.goto('https://webdriveruniversity.com')
})

test('open contact form', async ({page})=>{
    
    await page.goto('https://webdriveruniversity.com')
    
    await page.click('text=Contact Us')
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

test('invalid email', async ({page})=>{
    const invalidEmails= [
        'user',
        'user@',
        'user@.com.my',
        'user123@',
        'user123@.com',
        'user123@.com.com',
        'user123@.com@com',
        'user123@.com@com.com',
        'user@@gm.com'
    ]

    for (let i=0; i<invalidEmails.length;i++){
        await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
        await page.fill('input[name="first_name"]',firstName)
        await page.fill('input[name="last_name"]',lastName)
        await page.fill('input[name="email"]',invalidEmails[i])
        await page.fill('textarea[name="message"]',message)
        await page.click('input[type="submit"]')
        await expect(page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact_us.php')
        await expect(page.locator('body')).toContainText('Error: Invalid email address')
        await page.goBack()
    }
})

test('with empty firstname field', async ({page})=>{
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
    await page.fill('input[name="first_name"]','')
    await page.fill('input[name="last_name"]',lastName)
    await page.fill('input[name="email"]',email)
    await page.fill('textarea[name="message"]',message)
    await page.click('input[type="submit"]')
    await expect(page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact_us.php')
    await expect(page.locator('body')).toContainText('Error: all fields are required')
})

test('with empty lastname field', async ({page})=>{
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
    await page.fill('input[name="first_name"]',firstName)
    await page.fill('input[name="last_name"]','')
    await page.fill('input[name="email"]',email)
    await page.fill('textarea[name="message"]',message)
    await page.click('input[type="submit"]')
    await expect(page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact_us.php')
    await expect(page.locator('body')).toContainText('Error: all fields are required')
})

test('with empty email field', async ({page})=>{
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
    await page.fill('input[name="first_name"]',firstName)
    await page.fill('input[name="last_name"]',lastName)
    await page.fill('input[name="email"]','')
    await page.fill('textarea[name="message"]',message)
    await page.click('input[type="submit"]')
    await expect(page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact_us.php')
    await expect(page.locator('body')).toContainText('Error: Invalid email address')
    await expect(page.locator('body')).toContainText('Error: all fields are required')
})

test('with empty message text field', async ({page})=>{
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
    await page.fill('input[name="first_name"]',firstName)
    await page.fill('input[name="last_name"]',lastName)
    await page.fill('input[name="email"]',email)
    await page.fill('textarea[name="message"]','')
    await page.click('input[type="submit"]')
    await expect(page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact_us.php')
    await expect(page.locator('body')).toContainText('Error: all fields are required')
})


//test fails below no character limit validation in input fields
test('maximum charater in firstname input field',async ({page})=>{
    const firstname='honeybunny'.repeat(3000)

    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
    await page.fill('input[name="first_name"]',firstname)
    await page.fill('input[name="last_name"]',lastName)
    await page.fill('input[name="email"]',email)
    await page.fill('textarea[name="message"]',message)
    await page.click('input[type="submit"]')
    await expect(page.locator('body')).toContainText('Error: Characters exceed maximum limit')   
})

test('maximum charater in lastinput field',async ({page})=>{
    const lastname='honeybunny'.repeat(3000)

    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
    await page.fill('input[name="first_name"]',firstName)
    await page.fill('input[name="last_name"]',lastname)
    await page.fill('input[name="email"]',email)
    await page.fill('textarea[name="message"]',message)
    await page.click('input[type="submit"]')
    await expect(page.locator('body')).toContainText('Error: Characters exceed maximum limit')   
})

test('maximum charater in message input field',async ({page})=>{
    const newmessage='honeybunny'.repeat(3000)
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
    await page.fill('input[name="first_name"]',firstName)
    await page.fill('input[name="last_name"]',lastName)
    await page.fill('input[name="email"]',email)
    await page.fill('textarea[name="message"]',newmessage)
    await page.click('input[type="submit"]')
    await expect(page.locator('body')).toContainText('Error: Characters exceed maximum limit')
})


test('check the reset button', async ({page})=>{
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
    await page.fill('input[name="first_name"]',firstName)
    await page.fill('input[name="last_name"]',lastName) 
    await page.fill('input[name="email"]',email)
    await page.fill('textarea[name="message"]',message)
    await page.click('input[type="reset"]')
    await expect(page.locator('input[name="first_name"]')).toHaveValue('')
    await expect(page.locator('input[name="last_name"]')).toHaveValue('')
    await expect(page.locator('input[name="email"]')).toHaveValue('')
    await expect(page.locator('textarea[name="message"]')).toHaveValue('')

})

