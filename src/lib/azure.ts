import { BlobSASPermissions } from "@azure/storage-blob";
import {
  assetsContainer,
  bannerImagesContainer,
  profileImagesContainer,
} from "~/server/azure";
import { type Asset, AzureBlobContainer } from "~/lib/types";

export const EXPIRATION_DATE = new Date(Date.now() + 60 * 60 * 100 * 10); // 1 hour

export async function getSasUrl(asset: Asset, type: AzureBlobContainer) {
  const permissions = new BlobSASPermissions();
  permissions.read = true;
  permissions.add = false;
  permissions.delete = false;
  permissions.move = false;
  permissions.write = false;
  permissions.execute = false;

  // return "";

  // Be careful this is a cost per call so in dev mode it is recalled on every change
  if (type === AzureBlobContainer.BANNER) {
    return await bannerImagesContainer
      .getBlobClient(asset.azureBlobKey)
      .generateSasUrl({
        permissions,
        expiresOn: EXPIRATION_DATE,
      });
  } else if (type === AzureBlobContainer.PROFILE) {
    return await profileImagesContainer
      .getBlobClient(asset.azureBlobKey)
      .generateSasUrl({
        permissions,
        expiresOn: EXPIRATION_DATE,
      });
  } else {
    return await assetsContainer
      .getBlobClient(asset.azureBlobKey)
      .generateSasUrl({
        permissions,
        expiresOn: EXPIRATION_DATE,
      });
  }
}
