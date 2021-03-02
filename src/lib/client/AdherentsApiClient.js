import APIClient from "./ApiClient";
import ApiError from "@lib/ApiError";
import { sendMailTemplate } from "./MailApiClient";

/**
 * Let user register a new adherent
 * @param {Object} user
 * @param {Object} registrationFormData
 */
export const register = async (user, registrationFormData) => {
	try {
		const registrationSuccess = await APIClient.post(
			"/api/adherent/register",
			registrationFormData
		);
		// We have to be sure that the registration was a success before sending the welcome email
		await sendMailTemplate("welcome", registrationFormData);
		return registrationSuccess;
	} catch (err) {
		throw new ApiError(err.code || 500, err.message);
	}
};

/**
 * Let a user update some informations about an existing adherent
 * @param {Object} user
 * @param {Object} orgData
 */
export const update = async (user, orgData) => {
	try {
		return await APIClient.post(`/api/adherent/${orgData.siret}`, orgData);
	} catch (err) {
		throw new ApiError(err.code || 500, err.message);
	}
};

/**
 * Retrieve a list of Adherents following some criterias
 * (Filter by example)
 * @example
 *   const { rows } = await Parse.Adherent.retrieve({ nom: "*SARL" })
 *
 * @param {Object} params as key-value pairs
 */
export const retrieve = async (params = {}) => {
	try {
		return await APIClient.get(`/api/adherent`, params);
	} catch (err) {
		throw new ApiError(err.code || 500, err.message);
	}
};

const AdherentsApiClient = {
	register,
	retrieve,
	update
};

export default AdherentsApiClient;