# Lakeshore Marina Inventory and Media Manager Setup

The website includes a dealership-style inventory page at `/inventory.html` and a private content editor at `/admin/`.

## Important

The inventory editor cannot save changes on a drag-and-drop Netlify deployment. The existing Netlify project must be connected to a GitHub repository first. The custom domain can remain connected to the same Netlify project.

## Connect the current Netlify project to GitHub

1. In GitHub, create a new private repository named `lakeshore-marina`.
2. Upload every file and folder from the GitHub-ready website package to the repository's `main` branch.
3. In the existing Lakeshore Marina project on Netlify, open **Project configuration > Build & deploy > Continuous deployment**.
4. Choose **Link repository**, select GitHub, and select the `lakeshore-marina` repository.
5. Leave the build command blank. The included `netlify.toml` sets the publish directory to the repository root.
6. Deploy the site and confirm that `lakeshoremarina.org` still opens correctly.

## Enable the private inventory editor

1. In Netlify, open **Project configuration > Identity** and enable Netlify Identity.
2. Set registration to **Invite only** so the public cannot create editor accounts.
3. Under Identity services, enable **Git Gateway**.
4. Open the project's **Identity** user list and invite the media manager's email address.
5. The media manager accepts the invitation, creates a password, and visits `https://lakeshoremarina.org/admin/`.

## How the media manager updates boats

1. Open `/admin/` and sign in.
2. Choose **Boat Inventory**, then **Boats for Sale**.
3. Add a boat or edit an existing boat.
4. Upload a main photo and any additional photos. On a phone, the upload control allows choosing the camera or photo library.
5. Enter the year, make, model, condition, price, specifications, and description.
6. Set status to **Available**, **Sale Pending**, or **Sold**.
7. Press **Publish**. Netlify rebuilds the website automatically.

Sold boats stay saved in the inventory data but are automatically hidden from the public page. They can be changed back to Available later or removed in the editor.

## Customer inquiries

Each boat's **Inquire About This Boat** button opens the boat inquiry form with the brand, model, listing title, and stock number already filled in. Netlify saves the submission under the `boat-inquiry` form and can email it to the marina through the form notification configured in Netlify.
