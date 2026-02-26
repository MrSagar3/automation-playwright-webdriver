import {test,expect} from '@playwright/test'

test('login with invalid credentials', async ({page})=>{
    await page.goto('https://webdriveruniversity.com/Login-Portal/index.html')
    await page.fill('input[placeholder="Username"]','username')
    await page.fill('input[placeholder="Password"]','password')
    await page.click('button[type="submit"]')

    await page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("ok")
        expect(dialog.message()).toContain("validation failed")
        await dialog.accept()
    })


})

