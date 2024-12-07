# harmeepatel.dev

## Branches

#### Main
This branch just contains the static generated files. Workflow removes all other files (go, templ, 
makefile, and air)

#### Dev
Uses [Go](https://go.dev/) to assemble and generate *html* files. Using [Templ](https://templ.guide/)
for components. [Tailwind](https://tailwindcss.com/) for css (ofcourse).

Use ```air``` to watch go files. You might have to run ```templ generate``` every time you make a
change to a *.templ* file. If you use neovim you can use this autocommand to run templ  generate 
after every buffer write.

```lua
vim.api.nvim_create_autocmd({ 'BufWritePost' }, {
    desc = 'running templ generate on save',
    group = <your-group>,
    pattern = { '*.templ' },
    callback = function()
        vim.cmd(":silent !templ generate")
    end
})
```
