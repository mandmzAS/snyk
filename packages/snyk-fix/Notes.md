Notes:
- when a pom includes a module cli plugin is not scanning the dependencies of the modules but maven:dependencyTree is returning it


- sprint boot example we should look at supporting Bill of Materials patter where we fix the version in the <parent> tag, because user specifies  the version of a framework.
- for framework deps we can do either add version tag in the dependencies or bump the whole framework in parent.
