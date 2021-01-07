// StepForm.stories.js
import Input from "./Input";
import StepForm from "./StepForm";
import JSON from "@lib/utils/JSON";
import { Box, Grid } from "@material-ui/core";
import { withEventBus, useEventBus } from "@components/EventBusProvider";
import { useState } from "react";

// This default export determines where your story goes in the story list
export default {
	title: "Step Form",
	component: StepForm
};

export const Step = withEventBus((props) => {
	const eb = useEventBus();
	const [form, setForm] = useState({
		data: {
			firstName: "Joe",
			lastName: "Bingo",
			age: 22,
			job: {
				startDate: "2015-10-01"
			}
		},
		errors: false
	});
	const setSubmittedData = (data) => setForm({ data, errors: false });
	const setErrors = (errors) => setForm({ data: {}, errors });

	const askValidation = () => eb.send("person:validate");
	return (
		<Box width="75%">
			<StepForm
				formId="person"
				data={form.data}
				mode="onBlur"
				onSubmit={setSubmittedData}
				onErrors={setErrors}
			>
				<Grid container spacing={2}>
					<Grid item sm={6}>
						<Input.Text label="Prénom" name="firstName" autoFocus={true} />
					</Grid>
					<Grid item sm={6}>
						<Input.Text label="Nom" name="lastName" required={true} />
					</Grid>
					<Grid item sm={12}>
						<Input.Integer
							label="Age"
							name="age"
							required={true}
							min={0}
							max={200}
						/>
					</Grid>
					<Grid item sm={6}>
						<Input.Date
							label="Date d'arrivée"
							name="job.startDate"
							required={true}
						/>
					</Grid>
					<Grid item sm={6}>
						<Input.Date label="Date de départ" name="job.endDate" />
					</Grid>
				</Grid>
			</StepForm>
			<button onClick={askValidation}>Validate</button>
			<h2>Submitted Data</h2>
			<pre style={{ width: "100%" }}>
				<code>{JSON.stringify(form.data, null, "\t")}</code>
			</pre>
			<h2>Validation Error</h2>
			<pre style={{ color: "red", width: "100%" }}>
				<code>{JSON.stringify(form.errors, null, "\t")}</code>
			</pre>
		</Box>
	);
});
