#if !defined(BlinnPhongLighting_lib)
    #define BlinnPhongLighting_lib

    #include "Lighting.glsl";

struct PixelInfo {
    vec3 normalWS;
    vec3 viewDir;

    #ifdef LIGHTMAP
	#ifdef UV1
    vec2 lightmapUV;
	#endif // UV1
    #endif // LIGHTMAP
};

struct Surface {
    vec3 diffuseColor;
    vec3 specularColor;
    float shininess;
    vec3 gloss;
    float alpha;
    float alphaClip;
};

vec3 BlinnPhongLighting(in Surface surface, in Light light, in PixelInfo pixel)
{
    vec3 l = normalize(-light.dir);
    vec3 v = pixel.viewDir;

    vec3 normalWS = pixel.normalWS;

    vec3 diffuseColor = surface.diffuseColor;
    float shininess = surface.shininess;
    vec3 specularColor = surface.specularColor;
    vec3 gloss = surface.gloss;

    // difffuse
    float ndl = max(0.0, dot(normalWS, l));
    vec3 lightDiffuse = light.color * diffuseColor * ndl;

    // specular
    mediump vec3 h = normalize(v + l);
    lowp float ndh = max(0.0, dot(h, normalWS));
    float specularIntensity = pow(ndh, shininess * 128.0);
    vec3 lightSpecular = light.color * specularColor * specularIntensity * gloss;

    return lightDiffuse + lightSpecular;
}

vec3 BlinnPhongGI(const in Surface surface, const in PixelInfo info)
{
    vec3 giColor = vec3(0.0);
    #ifdef LIGHTMAP
	#ifdef UV1
    vec2 lightmapUV = info.lightmapUV;
    vec3 bakedColor = getBakedLightmapColor(lightmapUV);
    giColor = bakedColor * surface.diffuseColor;
	#endif // UV1

    #else // LIGHTMAP

	// todo 这部分移动到 scene 中 ?
	#ifdef GI_AMBIENT_SH

    vec3 n = info.normalWS;
    vec3 indirectDiffuse = max(diffuseIrradiance(n), 0.0) / PI;
    giColor = indirectDiffuse * surface.diffuseColor;

	#else // GI_AMBIENT_SH

    giColor = u_AmbientColor.rgb * surface.diffuseColor;

	#endif // GI_AMBIENT_SH

    #endif // LIGHTMAP

    return giColor;
}

#endif // BlinnPhongLighting_lib