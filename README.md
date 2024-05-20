# AWS S3 Image Uploader Chrome Extension

This Chrome extension allows users to upload images directly to an AWS S3 bucket using the AWS SDK for JavaScript.

## Features

- Upload images to AWS S3 bucket directly from the browser.
- Automatically calculates file extension based on MIME type.
- Customizable file naming convention with timestamp.

## Installation

To install the extension, follow these steps:

1. Clone this repository to your local machine.
2. Open Chrome browser and go to `chrome://extensions`.
3. Enable Developer mode.
4. Click on "Load unpacked" and select the cloned repository folder.

## Usage

1. Right-click on an image in your browser.
2. Select "Upload Image to CloudFlare R2" from the context menu.
3. Enter the desired filename when prompted.
4. Monitor the upload progress in the popup window.

## Configuration

Before using the extension, you need to configure the following parameters in the extension popup:

- Endpoint URL: The URL of your AWS S3 endpoint.
- Access Key ID: Your AWS access key ID.
- Secret Access Key: Your AWS secret access key.
- Bucket Name: The name of the S3 bucket where you want to upload images.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add feature'`).
5. Push to the branch (`git push origin feature`).
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
