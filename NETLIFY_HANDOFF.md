# Lakeshore Marina Inventory Handoff

The website includes a dealership-style inventory page at `/inventory.html` and a private content editor at `/admin/`.

## One-time setup

1. Put this website in a GitHub repository.
2. In Netlify, choose **Add new project** and import the GitHub repository.
3. Leave the build command blank and set the publish directory to the repository root.
4. In Netlify, open **Project configuration > Identity** and enable Netlify Identity.
5. Set registration to **Invite only**.
6. Enable **Git Gateway** under Identity services.
7. Invite the owner's email address as an Identity user.
8. After the invitation is accepted, the owner visits `https://YOUR-DOMAIN.com/admin/` to manage inventory.

## How the owner updates boats

1. Open `/admin/` and sign in.
2. Choose **Boat Inventory**, then **Boats for Sale**.
3. Add a boat or edit an existing boat.
4. Upload a main photo and any additional photos.
5. Enter the year, make, model, condition, price, specifications, and description.
6. Set status to **Available**, **Sale Pending**, or **Sold**.
7. Press **Publish**. Netlify rebuilds the website automatically.

Sold boats stay saved in the inventory data but are automatically hidden from the public page. They can be changed back to Available later or removed in the editor.
